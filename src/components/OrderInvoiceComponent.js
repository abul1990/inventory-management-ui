import React, { useState, useEffect, useMemo } from 'react';
import ItemService from '../services/ItemService';
import TableContainer from '../utils/TableContainer';
import { Container } from "reactstrap";


const OrderInvoiceComponent = () => {
    const [isNewCustomer, setCustomerState] = useState(true);
    const [items, setItems] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState({
        id: '', name: '', type: '', contactNo: '', address: ''
    })
    const [orderItem, setOrderItem] = useState({
        id: '', name: '', quantity: 0, price: 0, discount: 0, netPrice: 0, totalPrice:0
    });

    useEffect(() => {
        ItemService.fetchItem().then((response) => {
            setItems(response.data);
        }).catch(error => console.error());
    }, []);

    useEffect(() => {
        if (!isNewCustomer) {
            ItemService.fetchCustomer().then((response) => {
                setCustomers(response.data);
            }).catch(error => console.error());
        }
    }, [isNewCustomer])

    const handleCustomerChange = e => {
        setCustomer({
            id: e.target.value
        });
    };

    const handleCustomerNameChange = e => {
        setCustomer({
            name: e.target.value,
            type: customer.type,
            contactNo: customer.contactNo,
            address: customer.address
        })
    };

    const handleCustomerTypeChange = e => {
        setCustomer({
            name: customer.name,
            type: e.target.selectedOptions[0].innerText,
            contactNo: customer.contactNo,
            address: customer.address
        })
    };

    const handleContacNoChange = e => {
        setCustomer({
            name: customer.name,
            type: customer.type,
            contactNo: e.target.value,
            address: customer.address
        })
    };

    const handleAddressChange = e => {
        setCustomer({
            name: customer.name,
            type: customer.type,
            contactNo: customer.contactNo,
            address: e.target.value
        })
    };

    const handleItemChange = e => {
        setOrderItem({
            id: e.target.value,
            name: e.target.selectedOptions[0].innerText,
            quantity: orderItem.quantity,
            price: orderItem.price,
            discount: orderItem.discount,
            netPrice: orderItem.netPrice,
            totalPrice: orderItem.quantity * orderItem.netPrice
        });
    };

    const handleQuantityChange = e => {
        setOrderItem({
            id: orderItem.id,
            name: orderItem.name,
            quantity: e.target.value,
            price: orderItem.price,
            discount: orderItem.discount,
            netPrice: orderItem.netPrice,
            totalPrice: e.target.value * orderItem.netPrice
        })
    };

    const handlePriceChange = e => {
        setOrderItem({
            id: orderItem.id,
            name: orderItem.name,
            quantity: orderItem.quantity,
            price: e.target.value,
            discount: orderItem.discount,
            netPrice: orderItem.netPrice,
            totalPrice: orderItem.quantity * orderItem.netPrice
        })
    };

    const handleDiscountChange = e => {
        setOrderItem({
            id: orderItem.id,
            name: orderItem.name,
            quantity: orderItem.quantity,
            price: orderItem.price,
            discount: e.target.value,
            netPrice: orderItem.netPrice,
            totalPrice: orderItem.quantity * orderItem.netPrice
        })
    };

    const handleNetPriceChange = e => {
        setOrderItem({
            id: orderItem.id,
            name: orderItem.name,
            quantity: orderItem.quantity,
            price: orderItem.price,
            discount: orderItem.discount,
            netPrice: e.target.value,
            totalPrice: orderItem.quantity * e.target.value
        })
    };

    const handleAddRow = (e) => {
        if (orderItem.id !== '0' && orderItem.quantity !== '' && orderItem.price !== '') {
            setTableData([...tableData, orderItem]);
        } else {
            alert('Please provide valid item, quantity and price');
        }

    };
    const handleRemoveSpecificRow = (idx, rowData) => {
        let removeRows = [...rowData];
        removeRows.splice(idx, 1);
        setTableData(removeRows);
    }

    const handleNewCustomerChange = (e) => {
        setCustomerState(true);
    }

    const handleExistingCustomerChange = (e) => {
        setCustomerState(false);
    }

    const handleconfirmOrder = (e) => {
        let confirmOrders = [];
        tableData.map(order => 
            confirmOrders.push({
                itemId: order.id,
                quantity: order.quantity,
                price: order.price,
                discount: order.discount,
                netPrice: order.netPrice
            }));

        let customerWithOrder = {
            customer: customer, orders: confirmOrders
        }

        ItemService.placeOrder(customerWithOrder).then((response) => {
            console.log(response.data);
            alert('Placed Ordered Successfully');
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
                Header: "Quantity",
                accessor: "quantity",
            },
            {
                Header: "Price/Item",
                accessor: "price",
            },
            {
                Header: "Discount",
                accessor: "discount",
            },
            {
                Header: "Net Price/Item",
                accessor: "netPrice",
            },
            {
                Header: "Total Price/Item",
                accessor: "totalPrice"
            },
            {
                Header: "Action",
                disableFilters: true,
                Cell: body => <button type="button" className="btn btn-outline-danger btn-sm" onClick={e => handleRemoveSpecificRow(body.row.index, body.data)}>Remove</button>
            }
        ],
        []
    )

    return (
        <Container>
            <div className="row form-group" style={{ marginTop: 5, marginBottom: 5 }}>
                <div className="col-md-2">
                    <input type="radio" id="newcustomer" name="customer" value="newcustomer" defaultChecked onChange={handleNewCustomerChange} />
                    <label for="newcustomer">New Customer</label>
                </div>
                <div className="col-md-2">
                    <input type="radio" id="existingcustomer" name="customer" value="existingcustomer" onChange={handleExistingCustomerChange} />
                    <label for="existingcustomer">Existing Customer</label>
                </div>
                {(isNewCustomer) ?
                    <> <div className="col-md-2">
                        <select className="form-control" onChange={handleCustomerTypeChange}>
                            <option value="0">
                                - Customer Type-
                            </option>
                            <option value="1">
                                RETAIL
                            </option>
                            <option value="2">
                                WHOLESALE
                            </option>
                        </select>
                    </div><div className="col-md-2">
                            <input
                                type="textbox"
                                placeholder="Customer Name"
                                className="form-control" onChange={handleCustomerNameChange} />
                        </div><div className="col-md-2">
                            <input
                                type="textbox"
                                placeholder="Contact Number"
                                className="form-control" onChange={handleContacNoChange} />
                        </div><div className="col-md-2">
                            <input
                                type="textbox"
                                placeholder="Address"
                                className="form-control" onChange={handleAddressChange} />
                        </div>
                    </> :
                    <><div className="col-md-2">
                        <select className="form-control" onChange={handleCustomerChange}>
                            <option value="0">
                                - Select Customer -
                            </option>
                            {customers.map((customer) => <option key={customer.id} value={customer.id}>{customer.name}</option>)}
                        </select>
                    </div> </>
                }
            </div>
            <div className="row form-group" style={{ marginTop: 5, marginBottom: 5 }}>
                <div className="col-md-2">
                    <select className="form-control" onChange={e => handleItemChange(e)}>
                        <option value="0">
                            - Select Item -
                        </option>
                        {
                            items.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)
                        }
                    </select>
                </div>
                <div className="col-md-2">
                    <input
                        type="number" onChange={e => handleQuantityChange(e)}
                        placeholder="Quantity"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="number" onChange={e => handlePriceChange(e)}
                        placeholder="Price per Item"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="number" onChange={handleDiscountChange}
                        placeholder="Discount"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="number" onChange={handleNetPriceChange}
                        placeholder="Net Price"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <button type="button" onClick={e => handleAddRow(e)} className="btn btn-success btn-sm form-control">
                        <span className="glyphicon glyphicon-plus"></span> Add
                    </button>
                </div>
            </div>
            <TableContainer columns={columns} data={tableData} isBillingTable={true}></TableContainer>
            <div className="offset-10 col-md-2" style={{ marginTop: 10 }}>
                <button type="button" onClick={e => handleconfirmOrder(e)} className="btn btn-success btn-sm form-control">
                    Confirm Order </button>
            </div>
        </Container>
    )
}

export default OrderInvoiceComponent
