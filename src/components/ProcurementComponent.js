import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';
import TableContainer from '../utils/TableContainer';
import { Container } from "reactstrap";

const ProcurementComponent = () => {
    const [stocks, setStocks] = useState([]);
    const { itemId } = useParams();
    const isList = itemId === undefined || itemId === null ? true : false;

    useEffect(() => {
        if (isList) {
            ItemService.fetchStockHistory().then((response) => {
                setStocks(response.data);
            }).catch(error => console.error());
        } else {
            ItemService.fetchStockHistoryByItem(itemId).then((response) => {
                setStocks(response.data);
            }).catch(error => console.error())
        }
    }, [isList, itemId])

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
                Header: "Quantity",
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
                Header: "Supplier Name",
                accessor: "supplier",
            },
            {
                Header: "Purchased On",
                accessor: "purchasedOn",
            }
        ],
        []
    )

    return (
        <Container>
            <TableContainer columns={columns} data={stocks} />
        </Container>
    )
}

export default ProcurementComponent
