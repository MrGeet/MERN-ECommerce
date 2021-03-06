import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listUserOrders } from '../actions/orderActions';
import { orderUserListReducer } from '../reducers/orderReducers';

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails);
	const { loading, error, user } = userDetails;

	const orderUserList = useSelector((state) => state.orderUserList);
	const { loading: loadingOrders, error: errorOrders, orders: userOrders } = orderUserList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
	const { success } = userUpdateProfile;

	useEffect(() => {
		if (!userInfo) {
			history.push('/login');
		} else {
			if (!user.name) {
				dispatch(getUserDetails('profile'));
				dispatch(listUserOrders());
			} else {
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setMessage('Passwords do not match');
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }));
			//Dispatch update profile
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message ? <Message variant="danger">{message}</Message> : null}
				{error ? <Message variant="danger">{error}</Message> : null}
				{success ? <Message variant="success">Profile Updated</Message> : null}
				{loading && <Loader></Loader>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter your name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary" className="my-2">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant="danger">{errorOrders}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>Id</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid</th>
								<th>Delivered</th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{userOrders.map((item) => (
								<tr key={item._id}>
									<td>{item._id}</td>
									<td>{item.createdAt.substring(0, 10)}</td>
									<td>{item.totalPrice}</td>
									<td>
										{item.isPaid ? (
											item.paidAt.substring(0, 10)
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td>
										{item.isDelivered ? (
											item.deliveredAt.substring(0, 10)
										) : (
											<i
												className="fas fa-times"
												style={{ color: 'red' }}
											></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${item._id}`}>
											<Button variant="dark">Details</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
};

export default ProfileScreen;
