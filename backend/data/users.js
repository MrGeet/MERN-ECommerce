import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'admin@admin.com',
		password: bcrypt.hashSync('123123', 10),
		isAdmin: true,
	},
	{
		name: 'Krishant Kumar',
		email: 'krishat@email.com',
		password: bcrypt.hashSync('123123', 10),
	},
	{
		name: 'Ayla Heta',
		email: 'ayla@human.com',
		password: bcrypt.hashSync('123456', 10),
	},
	{
		name: 'Max Power',
		email: 'max@max.com',
		password: bcrypt.hashSync('123123', 10),
	},
];

export default users;
