import {
  col,
  fn,
  Op,
  Transaction,
  where,
  UpdateOptions,
  WhereOptions,
} from "sequelize";
import { Model, Sequelize } from "sequelize-typescript";
import pg from "pg";

import { ConfigurationException } from "../exceptionManager";
import { User, Exam, Subject, Hall, Av_Date, Av_Time, TimeTable } from "../../models";

type DbContext = Sequelize;
type TransactionScope = Transaction;
type Repository<M> = (new () => M) & NonAbstract<typeof Model>;

type NonAbstract<T> = {
  [P in keyof T]: T[P];
};

class DbConnection {
  public get dbContext(): DbContext {
    return this._dbContext;
  }

  public get transaction(): Transaction {
    if (!this._transaction) {
      throw new ConfigurationException(
        "Db connection or transaction is not initialized"
      );
    }
    return this._transaction;
  }

  public static getInstance(): DbConnection {
    if (!DbConnection._dbConnection) {
      DbConnection._dbConnection = new DbConnection();
    }
    return DbConnection._dbConnection;
  }

  private static _dbConnection: DbConnection;
  private readonly _dbContext: DbContext = this.getSequelizeConnection();
  private _transaction: Transaction | undefined;

  public async beginTransaction(): Promise<Transaction> {
    if (this._transaction) {
      return this._transaction;
    }
    const transaction: Transaction = await this._dbContext.transaction();
    this._transaction = transaction;
    return this._transaction;
  }

  private getSequelizeConnection(): Sequelize {
    return createSequelizeConnection();
  }
}

function getDbConnection(): DbConnection {
  return DbConnection.getInstance();
}

function createSequelizeConnection(): Sequelize {
  return new Sequelize(
    `postgres://postgres:1234Udith@1234@db.chcvzulngtkoqbwfugxv.supabase.co:6543/postgres`,
    {
      dialect: "postgres",
      dialectOptions: { connectTimeout: 60000 },
      models: [User, Exam, Subject, Hall, Av_Date, Av_Time, TimeTable],
    }
  );
}

// NOTE: Please use this function only for ETL realted SQL execution
// Connect to MySQL DB using Serverless-MySQL in order to execute RAW SQLs for ETL
async function getMySqlConnection(): Promise<any> {
  const db = pg();

  db.config({
    host: "db.chcvzulngtkoqbwfugxv.supabase.co",
    database: "postgres",
    user: "postgres",
    password: "1234Udith@1234",
    port: 6543,
  });

  await db.connect();
  return db;
}

const ISOLATION_LEVELS = Transaction.ISOLATION_LEVELS;

export {
  createSequelizeConnection,
  getDbConnection,
  DbContext,
  DbConnection,
  Repository,
  Op,
  TransactionScope,
  where,
  WhereOptions,
  UpdateOptions,
  getMySqlConnection,
  fn,
  col,
  ISOLATION_LEVELS,
};
