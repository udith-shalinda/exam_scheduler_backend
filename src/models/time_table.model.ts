import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { Hall, Subject } from ".";
import { Exam } from "./exam.model";

@Table({ underscored: true, tableName: "timetable" })
export class TimeTable extends Model<TimeTable> {
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
    type: DataType.STRING(),
    allowNull: false,
    unique: false,
  })
  public start!: string;

  @Column({
    type: DataType.STRING(),
    allowNull: false,
    unique: false,
  })
  public end!: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public examId!: number;

  @BelongsTo(() => Exam, {
    foreignKey: "examId",
    onDelete: "cascade",
  })
  public exam!: Exam;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public subjectId!: number;

  @BelongsTo(() => Subject, {
    foreignKey: "subjectId",
    onDelete: "cascade",
  })
  public subject!: Subject;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public hallId!: number;

  @BelongsTo(() => Subject, {
    foreignKey: "hallId",
    onDelete: "cascade",
  })
  public hall!: Hall;
  
}
