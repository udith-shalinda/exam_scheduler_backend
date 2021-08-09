import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Subject } from "./subject.model";

@Table({ underscored: true, tableName: "exam" })
export class Exam extends Model<Exam> {
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
    allowNull: false,
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

  @HasMany(() => Subject, { foreignKey: "examId" })
  public all_subjects!: Subject[];
}
