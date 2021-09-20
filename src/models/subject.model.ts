import {
  BelongsTo,
  Column,
  DataType,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { TimeTable } from ".";
import { Exam } from "./exam.model";

@Table({ underscored: true, tableName: "subject" })
export class Subject extends Model<Subject> {
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
  public mainYear!: number;

  @Column({
    type: DataType.STRING({ length: 100 }),
    allowNull: true,
    unique: false,
  })
  public repeatedYears!: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public time!: number;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
    unique: false,
  })
  public stu_count!: number;

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

  @HasOne(() => TimeTable, { foreignKey: "subjectId" })
  public timetable!: TimeTable;
}
