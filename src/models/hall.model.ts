import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Av_Date } from "./av_dates.model";

@Table({ underscored: true, tableName: "hall" })
export class Hall extends Model<Hall> {
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;

  @Column({
    type: DataType.STRING({ length: 100 }),
    allowNull: false,
    unique: false,
  })
  public name!: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public seats_count!: number;

  @HasMany(() => Av_Date, { foreignKey: "hallId" })
  public all_Av_Datess!: Av_Date[];
}
