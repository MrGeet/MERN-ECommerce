import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const { error: errorReview, success: successReview } = productReviewCreate;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	useEffect(() => {
		if (successReview) {
			alert('Review Submitted');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
		}
		dispatch(listProductDetails(match.params.id));
	}, [dispatch, match, successReview]);

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(match.params.id, { rating, comment }));
		setComment('');
	};

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6}>
							<Image src={product.image} alt={product.name} fluid></Image>
						</Col>
						<Col md={3}>
							<ListGroup variant="flush">
								<ListGroup.Item>
									<h2>{product.name}</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									></Rating>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>Description: ${product.description}</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant="flush">
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>

									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												{product.countInStock > 0
													? 'In Stock'
													: 'Out of Stock'}
											</Col>
										</Row>
									</ListGroup.Item>

									{product.countInStock > 0 && (
										<ListGroup.Item>
											<Row>
												<Col>Qty</Col>
												<Col>
													<Form.Control
														as="select"
														value={qty}
														onChange={(e) => setQty(e.target.value)}
													>
														{[
															...Array(product.countInStock).keys(),
														].map((x) => (
															<option key={x + 1} value={x + 1}>
																{x + 1}
															</option>
														))}
													</Form.Control>
												</Col>
											</Row>
										</ListGroup.Item>
									)}

									<ListGroup.Item>
										<Button
											className="btn-block"
											type="button"
											disabled={product.countInStock === 0}
											onClick={addToCartHandler}
										>
											Add to cart
										</Button>
									</ListGroup.Item>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant="flush">
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<strong>{review.name}</strong>
										<Rating value={review.rating}></Rating>
										<p>{review.createdAt.substring(0, 10)}</p>
										<p>{review.comment}</p>
									</ListGroup.Item>
								))}

								<ListGroup.Item>
									<h2>Write a Review</h2>
									{errorReview && (
										<Message variant="danger">{errorReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId="rating">
												<Form.Label>Rating</Form.Label>
												<Form.Control
													as="select"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
												>
													<option value="">Select...</option>
													<option value="1">1 – Very Bad</option>
													<option value="2">2 – Bad</option>
													<option value="3">3 – Fair</option>
													<option value="4">4 – Good</option>
													<option value="5">5 – Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId="comment">
												<Form.Label>Comment</Form.Label>
												<Form.Control
													as="textarea"
													row={3}
													onChange={(e) => setComment(e.target.value)}
												></Form.Control>
											</Form.Group>
											<Button type="submit" variant="primary">
												Submit
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to="/login">Sign In</Link> to write a
											review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
