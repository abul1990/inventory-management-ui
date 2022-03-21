import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ItemService from '../services/ItemService';
import TableContainer from '../utils/TableContainer';
import { Container } from "reactstrap";

const CustomerComponent = () => {
    const [customer, setCustomer] = useState({
        name: '',
        type: '',
        contactNo: '',
        address: ''
    });
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        ItemService.fetchCustomer().then((response) => {
            setCustomers(response.data);
        }).catch(error => console.error());
    }, []);

    const handleNameChange = (e) => {
        setCustomer({
            name: e.target.value,
            type: customer.type,
            contactNo: customer.contactNo,
            address: customer.address
        });
    }

    const handleTypeChange = (e) => {
        setCustomer({
            name: customer.name,
            type: e.target.selectedOptions[0].innerText,
            contactNo: customer.contactNo,
            address: customer.address
        });
    }

    const handleContactNoChange = (e) => {
        setCustomer({
            name: customer.name,
            type: customer.type,
            contactNo: e.target.value,
            address: customer.address
        });
    }

    const handleAddressChange = (e) => {
        setCustomer({
            name: customer.name,
            type: customer.type,
            contactNo: customer.contactNo,
            address: e.target.value
        });
    }

    const addCustomer = (e) => {
        e.preventDefault();
        ItemService.createCustomer(customer).then((response) => {
            ItemService.fetchCustomer().then((response) => {
                setCustomers(response.data);
                setCustomer({
                    name: '',
                    type: '',
                    contactNo: '',
                    address: ''
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
                Header: "Customer Code",
                accessor: "id",
            },
            {
                Header: "Customer Name",
                accessor: "name",
            },
            {
                Header: "Customer Type",
                accessor: "type",
            },
            {
                Header: "Contact No",
                accessor: "contactNo",
            },
            {
                Header: "Address",
                accessor: "address",
            },
            {
                Header: "Added On",
                accessor: "createdOn",
            },
            {
                Header: "Action",
                disableFilters: true,
                Cell: row => <Link to={`/orders`} className="btn btn-primary btn-sm">Order History</Link>
            }
        ],
        []
    )

    return (
        <Container>
            <div className="row form-group" style={{ marginTop: 5, marginBottom: 5 }}>
                <div className="col-md-2">
                    <input
                        type="textbox" value={customer.name} onChange={handleNameChange}
                        placeholder="Customer name"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <select className="form-control" onChange={handleTypeChange}>
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
                </div>
                <div className="col-md-2">
                    <input
                        type="textbox" value={customer.contactNo} onChange={handleContactNoChange}
                        placeholder="Contact Number"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <input
                        type="textbox" value={customer.address} onChange={handleAddressChange}
                        placeholder="Address"
                        className="form-control" />
                </div>
                <div className="col-md-2">
                    <button type="button" className="btn btn-success btn-sm form-control" onClick={addCustomer}>
                        <span className="glyphicon glyphicon-plus"></span> Add Customer
                    </button>
                </div>
            </div>
            <TableContainer columns={columns} data={customers} />
        </Container>
    )
}

export default CustomerComponent
