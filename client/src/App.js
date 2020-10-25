// import logo from './logo.svg';
import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import OrderCreate from "./components/OrderCreate";
import OrderList from './components/OrdersList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Orders Opertions Portal
      </header>
      <Router>
        <Switch>
          <Route exac path="/order/:id">
            <OrderCreate />
          </Route>
          <Route exac path="/new">
            <OrderCreate />
          </Route>
          <Route exac path="/">
            <OrderList />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
