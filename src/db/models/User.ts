import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Trade } from './Trade';

@Table({
	timestamps: true,
})
export class User extends Model {
	@Column({
		allowNull: false,
		type: DataTypes.DECIMAL(16, 2),
	})
	balance!: number;

	@HasMany(() => Trade)
	trades!: Trade[];
}
