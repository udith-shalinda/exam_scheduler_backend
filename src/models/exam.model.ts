import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Hall } from "./hall.model";
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
    unique: true,
  })
  public name!: string;

  @HasMany(() => Subject, { foreignKey: "examId" })
  public all_subjects!: Subject[];

  @HasMany(() => Hall, { foreignKey: "examId" })
  public allHalls!: Hall[];
}
