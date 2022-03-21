import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ItemService from '../services/ItemService';
import TableContainer from '../utils/TableContainer';
import { Container } from "reactstrap";

const ItemComponent = () => {
    const [item, setItem] = useState({
        name: '',
        discountRetail: '',
        discountWholesale: ''
    });
    const [items, setItems] = useState([]);

    useEffect(() => {
        ItemService.fetchItem().then((response) => {
            setItems(response.data);
        }).catch(error => console.error());
    }, []);

    const handleNameChange = (e) => {
        setItem({
            name: e.target.value,
            discountRetail: item.discountRetail,
            discountWholesale: item.discountWholesale
        });
    }

    const handleDiscountRetailChange = (e) => {
        setItem({
            name: item.name,
            discountRetail: e.target.value,
            discountWholesale: item.discountWholesale
        });
    }

    const handleDiscountWholeSaleChange = (e) => {
        setItem({
            name: item.name,
            discountRetail: item.discountRetail,
            discountWholesale: e.target.value
        });
    }

    const addItem = (e) => {
        e.preventDefault();
        ItemService.createItem(item).then((response) => {
            ItemService.fetchItem().then((response) => {
                setItems(response.data);
                setItem({
                    name: '',
                    discountRetail: '',
                    discountWholeSale: ''
                });
            }).catch(error => console.error());
        }).catch(error => console.error());
    }

    const columns = useMemo(
        () => [
            {
                Header: "#",
                disableFilters: true,
                Cell: row => row.row.index + 1
            },
            {
                Header: "Item Code",
                accessor: "id",
            },
            {
                Header: "Item Name",
                accessor: "name",
            },
            {
                Header: "Retail Discount",
                accessor: "discountRetail",
            },
            {
                Header: "Wholesale Discount",
                accessor: "discountWholesale",
            },
            {
                Header: "Added On",
                accessor: "createdOn",
            },
            {
                Header: "Action",
                disableFilters: true,
                Cell: row => <Link to={`/stocks/${row.row.values.id}`} className="btn btn-primary btn-sm">Add New Stock</Link>
            }
        ],
        []
    )

    return (
        <Container>
            <div className="row form-group" style={{ marginTop: 5, marginBottom: 5 }}>
                <div className="col-md-2">
                    <input
                        type="textbox" value={item.name} onChange={handleNameChange}
                        placeholder="New Item name"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="textbox" value={item.discountRetail} onChange={handleDiscountRetailChange}
                        placeholder="Retail Discount"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="textbox" value={item.discountWholesale} onChange={handleDiscountWholeSaleChange}
                        placeholder="Wholesale Discount"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <button type="button" className="btn btn-success btn-sm form-control" onClick={addItem}>
                        <span className="glyphicon glyphicon-plus"></span> Add Item
                    </button>
                </div>
            </div>
            <TableContainer columns={columns} data={items} />
        </Container>
    )
}

export default ItemComponent
