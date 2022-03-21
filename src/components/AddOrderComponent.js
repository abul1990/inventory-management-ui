import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import ItemService from '../services/ItemService';

const AddOrderComponent = () => {
    const [quantity, setQuantity] = useState('');
    const [actualPrice, setActualPrice] = useState();
    const [sellingPrice, setSellingPrice] = useState('');
    const { itemId } = useParams();

    const placeOrder = (e) => {
        e.preventDefault();
        const order = { quantity, actualPrice, sellingPrice };

        ItemService.placeOrder(itemId, order).then((response) => {
            console.log(response.data);
        }).catch(error => console.error());
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="card col-md-6 offset-md-3 offset-md-3">
                    <h2 className="text-center">Place Order</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group-mb-2">
                                <label className="form-label">Quantity:</label>
                                <input type="text" placeholder="Enter quantity"
                                    name="quantity" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                                <label className="form-label">Actual Price Per Item:</label>
                                <input type="text" placeholder="Enter actual price per item"
                                    name="price" className="form-control" value={actualPrice} onChange={(e) => setActualPrice(e.target.value)}></input>
                                <label className="form-label">Selling Price Per Item:</label>
                                <input type="text" placeholder="Enter selling price per item"
                                    name="supplier" className="form-control" value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)}></input>
                            </div>
                            <button className="btn btn-success btn-sm" onClick={(e) => placeOrder(e)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AddOrderComponent
