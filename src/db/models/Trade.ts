import { Table, Column, Model, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from './User';

@Table({
	timestamps: true,
})
export class Trade extends Model {
	@Column(DataTypes.INTEGER)
	quantity!: number;

	@Column(DataTypes.DECIMAL(12, 4))
	price!: number;

	@Column
	stock!: boolean;

	@Column(DataTypes.CHAR(12))
	symbol!: string;

	@ForeignKey(() => User)
	@Column
	userId!: number;

	@BelongsTo(() => User)
	user!: User;
}
