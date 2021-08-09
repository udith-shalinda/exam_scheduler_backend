import { DbConnection, getDbConnection } from "@libs/dbContext/_dbContext";

const migrate = async () => {
  try {
    const dbConnection: DbConnection = getDbConnection();
    await dbConnection.dbContext.sync({ alter: true });
    console.log('Migrate Complete');
  } catch (err) {
    console.error(err);
  }
};
(async () => {
  migrate();
})();
