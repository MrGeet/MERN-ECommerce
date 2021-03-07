import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import UserEditScreen from './screens/UserEditScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import UserListScreen from './screens/UserListScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './bootstrap.min.css';
import './index.css';

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/register" component={RegisterScreen} />
					<Route path="/login" component={LoginScreen} />
					<Route path="/profile" component={ProfileScreen} />
					<Route path="/shipping" component={ShippingScreen} />
					<Route path="/payment" component={PaymentScreen} />
					<Route path="/order/:id" component={OrderScreen} />
					<Route path="/placeorder" component={PlaceOrderScreen} />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/admin/userlist" component={UserListScreen} />
					<Route path="/admin/productlist" component={ProductListScreen} />
					<Route path="/admin/user/:id/edit" component={UserEditScreen} />
					<Route path="/admin/product/:id/edit" component={ProductEditScreen} />
					<Route path="/" component={HomeScreen} exact />
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
