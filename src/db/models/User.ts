import { sql } from '../index';
import { DataTypes, Model } from 'sequelize';
console.log('init user');

interface UserAttributes {
	id: number;
	balance: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export class User extends Model<UserAttributes, UserAttributes> implements UserAttributes {
	public id!: number;
	public balance!: number;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

export async function initUser() {
	User.init(
		{
			id: {
				type: DataTypes.DECIMAL(19, 0),
				allowNull: false,
				primaryKey: true,
			},
			balance: {
				type: DataTypes.DECIMAL(16, 2),
				allowNull: false,
			},
		},
		{
			timestamps: true,
			sequelize: sql(),
			tableName: 'users',
		}
	);
	User.sync();
}
