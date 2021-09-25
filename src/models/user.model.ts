import { providerTypes } from "@functions/user/user.interface";
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ underscored: true, tableName: "user" })
export class User extends Model<User> {
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
  public username!: string;

  @Column({
    type: DataType.STRING({ length: 10 }),
    unique: false,
    defaultValue: providerTypes.email,
  })
  public provider!: providerTypes;

  @Column({
    type: DataType.STRING({ length: 100 }),
    allowNull: true,
    unique: true,
  })
  public email!: string;

  //   @Column({
  //     type: DataType.STRING({ length: 100 }),
  //     allowNull: false,
  //     unique: true,
  //   })
  //   public phone!: string;

  //   @Column({
  //     type: DataType.BOOLEAN,
  //     allowNull: false,
  //     defaultValue: false,
  //   })
  //   public verified!: boolean;

  @Column({
    type: DataType.STRING({ length: 255 }),
    allowNull: false,
  })
  public password!: string;
}
