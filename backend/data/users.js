import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@admin.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
	},
	{
		name: 'Krishant Kumar',
		email: 'krishat@human.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Ayla Heta',
		email: 'ayla@human.com',
		password: bcrypt.hashSync('123456', 10),
	},
];

export default users;
