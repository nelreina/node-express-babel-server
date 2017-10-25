import converter from 'json-2-csv';
import Sequelize from 'sequelize';
import { dbconn } from '../config.json';

const { database, username, password, options } = dbconn;

const mssql = new Sequelize(database, username, password, options);
console.log(`Database Connected to host:${options.host} | dbname:${database}`);

const invokeSQLCmd = async (query, returnObject = false) => {
  let result;
  try {
    result = await mssql.query(query, { type: mssql.QueryTypes.SELECT });
    if (returnObject) {
      result = result.length > 0 ? result[0] : {};
    }
  } catch (error) {
    const { message, name } = error;
    result = { message, name };
    // result = error;
  }
  return result;
};

const toCSV = jsonArray =>
  new Promise((resolve, reject) => {
    converter.json2csv(jsonArray, (err, csv) => {
      if (err) return reject(err);
      resolve(csv);
    });
  });
const findObject = (data, field, code) => {
  const f = data.filter(d => d[field] === code);
  if (f.length === 1) {
    return f[0];
  } else {
    return {};
  }
};
export { toCSV, findObject, invokeSQLCmd };
