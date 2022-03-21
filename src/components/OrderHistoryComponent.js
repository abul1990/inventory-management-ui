import React, { useState, useEffect, useMemo } from 'react';
import ItemService from '../services/ItemService';
import TableContainer from '../utils/TableContainer';
import { Container } from "reactstrap";

const OrderHistoryComponent = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        ItemService.fetchOrder().then((response) => {
            setOrders(response.data);
        }).catch(error => console.error());
    }, [])

    const columns = useMemo(
        () => [
            {
                Header: "#",
                disableFilters: true,
                Cell: row => row.row.index + 1
            },
            {
                Header: "Order Code",
                accessor: "id"
            },
            {
                Header: "Customer Name",
                accessor: "customerName",
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
                Header: "Price/Item",
                accessor: "price",
            },
            {
                Header: "Net Price/Item",
                accessor: "netPrice",
            },
            {
                Header: "Total Price",
                accessor: "totalPrice",
            },
            {
                Header: "Sold On",
                accessor: "createdOn",
            }
        ],
        []
    )

    return (
        <Container>
            <TableContainer columns={columns} data={orders} />
        </Container>
    )
}

export default OrderHistoryComponent