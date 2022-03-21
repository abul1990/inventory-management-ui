import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';

const AddStockComponent = () => {
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState(0);
    const [supplier, setSupplier] = useState('');
    const {itemId} = useParams();

    const addStock = (e) => {
        e.preventDefault();
        const procurement = { quantity, price, supplier };

        ItemService.createStock(itemId, procurement).then((response) => {
            window.location.href = 'http://localhost:3000/';
        }).catch(error => console.error());
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Add Stock</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group-mb-2">
                                <label className="form-label">Quantity:</label>
                                <input type="text" placeholder="Enter quantity"
                                    name="quantity" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                                <label className="form-label">Price Per Item:</label>
                                <input type="text" placeholder="Enter price per item"
                                    name="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                                <label className="form-label">Supplier:</label>
                                <input type="text" placeholder="Enter supplier"
                                    name="supplier" className="form-control" value={supplier} onChange={(e) => setSupplier(e.target.value)}></input>
                            </div>
                            <button className="btn btn-success btn-sm" onClick={(e) => addStock(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddStockComponent
