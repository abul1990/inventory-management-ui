import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ItemComponent from './components/ItemComponent';
import AddItemComponent from './components/AddItemComponent';
import StockComponent from './components/StockComponent';
import AddStockComponent from './components/AddStockComponent';
import ProcurementComponent from './components/ProcurementComponent';
import AddOrderComponent from './components/AddOrderComponent';
import OrderInvoiceComponent from './components/OrderInvoiceComponent';
import OrderHistoryComponent from './components/OrderHistoryComponent';
import CustomerComponent from './components/CustomerComponent';

function App() {
  return (
    <div className="App">
      <Router createBrowserHistory={createBrowserHistory}>
        <Routes>
          <Route exact path="/" element={<ItemComponent></ItemComponent>}></Route>
          <Route path="/items" element={<ItemComponent></ItemComponent>}></Route>
          <Route path="/add-item" element={<AddItemComponent></AddItemComponent>}></Route>
          <Route path="/stocks" element={<StockComponent></StockComponent>}></Route>
          <Route path="/stocks/:itemId" element={<StockComponent></StockComponent>}></Route>
          <Route path="/add-stock/:itemId" element={<AddStockComponent></AddStockComponent>}></Route>
          <Route path="/stock-history" element={<ProcurementComponent></ProcurementComponent>}></Route>
          <Route path="/stock-history/:itemId" element={<ProcurementComponent></ProcurementComponent>}></Route>
          <Route path="/add-order/:itemId" element={<AddOrderComponent></AddOrderComponent>}></Route>
          <Route path="/order-invoice" element={<OrderInvoiceComponent></OrderInvoiceComponent>}></Route>
          <Route path="/orders" element={<OrderHistoryComponent></OrderHistoryComponent>}></Route>
          <Route path="/customers" element={<CustomerComponent></CustomerComponent>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
