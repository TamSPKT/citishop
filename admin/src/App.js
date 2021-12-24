import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import CategoryList from "./pages/categoryList/CategoryList";
import Category from "./pages/category/Category";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import NewCategory from "./pages/newCategory/NewCategory";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";

function App() {
  return (
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/newUser">
            <NewUser />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
          <Route path="/category">
            <CategoryList />
          </Route>
          <Route path="/newcategory">
            <NewCategory />
          </Route>
          <Route path="/categoryproduct/:categoryId">
            <Category />
          </Route>
          <Route path="/orders">
            <OrderList />
          </Route>
          <Route path="/order/:orderId">
            <Order />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
