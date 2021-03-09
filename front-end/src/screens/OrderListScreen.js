import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Message';
import { LinkContainer } from 'react-router-bootstrap';
import { listOrders } from '../actions/orderActions';

const UserListScreen = ({ history }) => {
	const dispatch = useDispatch();

	const orderList = useSelector((state) => state.orderList);
	const { loading, error, orders } = orderList;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	// const userRemove = useSelector((state) => state.userRemove);
	// const { success: successRemove } = userRemove;

	useEffect(() => {
		console.log(userInfo);
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrders());
		} else {
			history.push('/login');
		}
	}, [dispatch, history, userInfo]);

	// const deleteHandler = (id) => {
	// 	if (
	// 		window.confirm(
	// 			'This action will permanently remove the user from the database, are you sure?'
	// 		)
	// 	) {
	// 		dispatch(removeUser(id));
	// 	}
	// };

	// console.log(userList);

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>Id</th>
							<th>User</th>
							<th>Date</th>
							<th>Total Price</th>
							<th>Paid</th>
							<th>Delivered</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>{order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant="dark" className="btn-sm">
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
