import axios from 'axios'

const BASE_URL = 'http://localhost:32440/inventory-api';
const ITEM_BASE_URL = BASE_URL + '/items';
const STOCK_BASE_URL = BASE_URL + '/stocks';
const STOCK_HISTORY_BASE_URL = BASE_URL + '/procurements';
const ORDER_BASE_URL = BASE_URL + '/orders';
const CUSTOMER_BASE_URL = BASE_URL + '/customers';

class ItemService {
    fetchItem() {
        return axios.get(ITEM_BASE_URL);
    }

    createItem(item) {
        return axios.post(ITEM_BASE_URL, item);
    }

    fetchStock() {
        return axios.get(STOCK_BASE_URL);
    }

    fetchStockByItem(itemId) {
        return axios.get(ITEM_BASE_URL + '/' + itemId + '/stocks');
    }

    createStock(itemId, procurement) {
        return axios.post(ITEM_BASE_URL + '/' + itemId + '/procurements', procurement);
    }

    fetchStockHistory() {
        return axios.get(STOCK_HISTORY_BASE_URL);
    }

    fetchStockHistoryByItem(itemId) {
        return axios.get(ITEM_BASE_URL + '/' + itemId + '/procurements');
    }

    placeOrder(orders) {
        console.log('orders', orders)
        return axios.post(ORDER_BASE_URL, orders);
    }

    fetchOrder() {
        return axios.get(ORDER_BASE_URL);
    }

    fetchCustomer() {
        return axios.get(CUSTOMER_BASE_URL);
    }

    createCustomer(customer) {
        console.log('cust', customer)
        return axios.post(CUSTOMER_BASE_URL, customer);
    }

}

export default new ItemService();