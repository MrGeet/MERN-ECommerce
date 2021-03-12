import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image, Container, Row, Col } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';

const ProductCarousel = () => {
	const dispatch = useDispatch();

	const productTopRated = useSelector((state) => state.productTopRated);
	const { loading, error, products } = productTopRated;

	useEffect(() => {
		dispatch(listTopProducts());
	}, [dispatch]);

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant="danger">{error}</Message>
	) : (
		<Carousel pause="hover" className="bg-dark">
			<Carousel.Item>
				<Container>
					<Container>
						<Row className="justify-content-md-center">
							<Image src="images/Galaxy_s21.png" alt="Galaxy S21" fluid />
						</Row>
						<Row className="justify-content-md-center">
							<Carousel.Caption>
								<h2>New Samsung Galaxy S21</h2>
							</Carousel.Caption>
						</Row>
					</Container>
				</Container>
			</Carousel.Item>

			<Carousel.Item>
				<Container>
					<Container>
						<Row className="justify-content-md-center">
							<Image src="images/sale.png" alt="Galaxy S21" fluid />
						</Row>
						<Row className="justify-content-md-center">
							<Carousel.Caption>
								<h2>Crazy Discounts</h2>
							</Carousel.Caption>
						</Row>
					</Container>
				</Container>
			</Carousel.Item>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Container>
							<Row className="justify-content-md-center align-items-end">
								<Image src={product.image} alt={product.name} fluid />
							</Row>
							<Row className="justify-content-md-center">
								<Carousel.Caption className="carousel-caption">
									<h2>{product.name}</h2>
								</Carousel.Caption>
							</Row>
						</Container>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default ProductCarousel;
