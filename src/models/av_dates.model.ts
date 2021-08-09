import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { Av_Time } from "./av_times.model";
import { Hall } from "./hall.model";

@Table({ underscored: true, tableName: "av_date" })
export class Av_Date extends Model<Av_Date> {
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
  public date!: Date;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public hallId!: number;

  @BelongsTo(() => Hall, {
    foreignKey: "hallId",
    onDelete: "cascade",
  })
  public hall!: Hall;

  @HasMany(() => Av_Time, { foreignKey: "av_date_id" })
  public all_Av_Times!: Av_Time[];
}
