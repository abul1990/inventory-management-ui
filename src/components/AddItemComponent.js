import React, { useState } from 'react';
import ItemService from '../services/ItemService';

const AddItemComponent = () => {
    const [name, setItemName] = useState('');

    const addItem = (e) => {
        e.preventDefault();
        const item = { name };

        ItemService.createItem(item).then((response) => {
            window.location.href = 'http://localhost:3000/';
        }).catch(error => console.error());
    }

    return (
        <div className="container">
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Add Item</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group-mb-2">
                                <label className="form-label">Item Name:</label>
                                <input type="text" placeholder="Enter item name"
                                    name="itemName" className="form-control" value={name} onChange={(e) => setItemName(e.target.value)}></input>
                            </div>
                            <button className="btn btn-success btn-sm" onClick={(e) => addItem(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddItemComponent
