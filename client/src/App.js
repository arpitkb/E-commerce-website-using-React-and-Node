import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Container, Placeholder } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import PrivateRoute from "./components/routing/PrivateRoute";
import AdminRoute from "./components/routing/AdminRoutes";
import UserListScreen from "./screens/AdminScreens/UserListScreen";
import Alert from "./components/UI/Alert";
import UserProfileScreen from "./screens/AdminScreens/UserProfileScreen";
import ProductsListScreen from "./screens/AdminScreens/ProductsListScreen";
import CreateProductScreen from "./screens/AdminScreens/CreateProductScreen";
import UpdateProductScreen from "./screens/AdminScreens/UpdateProductScreen";
import OrdersListScreen from "./screens/AdminScreens/OrdersListScreen";
import PaymentDo from "./screens/PaymentDo";
import NotFoundScreen from "./screens/NotFoundScreen";

function App() {
  return (
    <>
      <Header />
      <Alert />
      <Container>
        <main className='py-2'>
          <Routes>
            <Route exact path='/' element={<HomeScreen />} />
            <Route path='product/:id' element={<ProductScreen />} />

            <Route path='cart' element={<CartScreen />}>
              <Route path=':id' element={<CartScreen />} />
            </Route>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route
              path='/profile'
              element={<PrivateRoute component={<ProfileScreen />} />}
            />
            <Route
              path='/shipping'
              element={<PrivateRoute component={<ShippingScreen />} />}
            />
            <Route
              path='/payment'
              element={<PrivateRoute component={<PaymentScreen />} />}
            />
            <Route
              path='/placeorder'
              element={<PrivateRoute component={<PlaceOrderScreen />} />}
            />
            <Route
              path='/payment/paypal'
              element={<PrivateRoute component={<PaymentDo />} />}
            />
            <Route
              path='/order/:id'
              element={<PrivateRoute component={<OrderScreen />} />}
            />

            {/*  admin routes start */}
            <Route
              path='/admin/users'
              element={<AdminRoute component={<UserListScreen />} />}
            />

            <Route
              path='/admin/users/:id'
              element={<AdminRoute component={<UserProfileScreen />} />}
            />
            <Route
              path='/admin/products'
              element={<AdminRoute component={<ProductsListScreen />} />}
            />

            <Route
              path='/admin/products/new'
              element={<AdminRoute component={<CreateProductScreen />} />}
            />
            <Route
              path='/admin/products/:id'
              element={<AdminRoute component={<UpdateProductScreen />} />}
            />
            <Route
              path='/admin/orders'
              element={<AdminRoute component={<OrdersListScreen />} />}
            />
            {/* admin routes end */}

            <Route path='*' element={<NotFoundScreen />} />
          </Routes>
        </main>
      </Container>
      {/* <Footer /> */}
    </>
  );
}

export default App;
