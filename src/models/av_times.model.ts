import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Av_Date } from "./av_dates.model";

@Table({ underscored: true, tableName: "av_time" })
export class Av_Time extends Model<Av_Time> {
  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  public id!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: false,
  })
  public start!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    unique: false,
  })
  public end!: Date;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public av_date_id!: number;

  @BelongsTo(() => Av_Date, {
    foreignKey: "av_date_id",
    onDelete: "cascade",
  })
  public av_Date!: Av_Date;
}
