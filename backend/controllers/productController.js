import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';

//@desc Fetch all products
//@route GET /api/products
//@access Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});

	res.json(products);
});

//@desc Fetch single product
//@route GET /api/products/:id
//@access Public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);

		throw new Error('Product not found');
	}
});

//@desc delete single product
//@route delete /api/products/:id
//@access private, admin
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({
			message: 'Product removed',
		});
	} else {
		res.status(404);

		throw new Error('Product not found');
	}
});

//@desc create a product
//@route post /api/products/
//@access private, admin
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample Name',
		image: '/images/sample.jpg',
		description: 'Sample Description',
		brand: 'sample brand',
		category: 'Sample category',
		price: 0,
		countInStock: 0,
		rating: 0,
		numReviews: 0,
		user: req.user._id,
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

//@desc update a product
//@route put /api/products/:id
//@access private, admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();

		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

export { getProducts, getProductById, deleteProduct, updateProduct, createProduct };
