import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Hall } from "./hall.model";
import { Subject } from "./subject.model";
import { TimeTable } from "./time_table.model";

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
    unique: true,
  })
  public name!: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    unique: false,
  })
  public year_one!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    unique: false,
  })
  public year_two!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    unique: false,
  })
  public year_three!: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    unique: false,
  })
  public year_four!: Date;
  

  @HasMany(() => Subject, { foreignKey: "examId" })
  public all_subjects!: Subject[];

  @HasMany(() => Hall, { foreignKey: "examId" })
  public allHalls!: Hall[];

  @HasMany(() => TimeTable, { foreignKey: "examId" })
  public allTimeTables!: TimeTable[];
}
