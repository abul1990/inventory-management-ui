import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';
import TableContainer from '../utils/TableContainer';
import { Container } from "reactstrap";

const StockComponent = () => {
    const [stocks, setStocks] = useState([]);
    const [stock, setStock] = useState({ quantity: '', price: '', supplier: '', contactNo: '' });
    const [items, setItems] = useState([]);
    const { itemId } = useParams();
    const [selectedItemId, setSelectedItemId] = useState(itemId === undefined || itemId === null ? '' : itemId);
    const isList = (itemId === undefined || itemId === null) ? true : false;

    useEffect(() => {
        ItemService.fetchItem().then((response) => {
            setItems(response.data);
        }).catch(error => console.error(error));
        if (isList) {
            ItemService.fetchStock().then((response) => {
                setStocks(response.data);
            }).catch(error => console.error(error));
        } else {
            ItemService.fetchStockByItem(itemId).then((response) => {
                setStocks(new Array(response.data));
            }).catch(error => console.error(error));
        }
    }, [isList, itemId]);


    const handleItemChange = e => {
        setSelectedItemId(e.target.value);
    };

    const handleQuantityChange = e => {
        setStock({
            quantity: e.target.value,
            price: stock.price,
            supplier: stock.supplier,
            contactNo: stock.contactNo
        });
    };

    const handlePriceChange = e => {
        setStock({
            quantity: stock.quantity,
            price: e.target.value,
            supplier: stock.supplier,
            contactNo: stock.contactNo
        });
    };

    const handleSupplierChange = e => {
        setStock({
            quantity: stock.quantity,
            price: stock.price,
            supplier: e.target.value,
            contactNo: stock.contactNo
        });
    };

    const handleContactNoChange = e => {
        setStock({
            quantity: stock.quantity,
            price: stock.price,
            supplier: stock.supplier,
            contactNo: e.target.value
        });
    };

    const handleAddStock = (e) => {
        e.preventDefault();
        ItemService.createStock(selectedItemId, stock).then((response) => {
            ItemService.fetchStocks().then((response) => {
                setStocks(response.data);
                setStock({ quantity: '', price: '', supplier: '', contactNo: '' });
            }).catch(error => console.error());
        }).catch(error => console.error());
    };

    const columns = useMemo(
        () => [
            {
                Header: "#",
                disableFilters: true,
                Cell: row => row.row.index + 1
            },
            {
                Header: "Item Code",
                accessor: "itemId",
            },
            {
                Header: "Item Name",
                accessor: "itemName",
            },
            {
                Header: "Available Quantity",
                accessor: "quantity",
            },
            {
                Header: "Price Per Item",
                accessor: "price",
            },
            {
                Header: "Total Price",
                accessor: "totalPrice",
            },
            {
                Header: "Action",
                disableFilters: true,
                Cell: row => <>
                    <Link to={`/stock-history/${row.row.values.itemId}`} type="button" className="btn btn-info btn-sm">Stock History</Link>
                </>
            }
        ],
        []
    )

    return (
        <Container>
            <div className="row form-group" style={{ marginTop: 5, marginBottom: 5 }}>
                <div className="col-md-2">
                    <select className="form-control" onChange={e => handleItemChange(e)}>
                        <option value="0">
                            - Select Item -
                      </option>
                        {
                            items.map((item) =>
                                <option selected={selectedItemId === item.id ? "selected" : ""} key={item.id} value={item.id}>{item.name}</option>
                            )
                        }
                    </select>
                </div>
                <div className="col-md-2">
                    <input
                        type="number" value={stock.quantity} onChange={e => handleQuantityChange(e)}
                        placeholder="Quantity"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="number" value={stock.price} onChange={e => handlePriceChange(e)}
                        placeholder="Price per Item"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="textbox" value={stock.supplier} onChange={e => handleSupplierChange(e)}
                        placeholder="Supplier Name"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="number" value={stock.contactNo} onChange={e => handleContactNoChange(e)}
                        placeholder="Contact Number"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={e => handleAddStock(e)} className="btn btn-success btn-sm form-control">
                        <span className="glyphicon glyphicon-plus"></span> Add Stock
                    </button>
                </div>
            </div>
            <TableContainer columns={columns} data={stocks} />
        </Container>
    )
}

export default StockComponent
