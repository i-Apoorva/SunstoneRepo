'use strict';

import { readdirSync } from "fs";
import { Sequelize, DataTypes } from "sequelize";
import { fileURLToPath } from 'url';
import { basename, dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const env = process.env.NODE_ENV || 'development';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const config = require(__dirname+'/../config/config.json');
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  config.dialect = "mysql"
  sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, config);
}

const files = readdirSync(__dirname)
    .filter(
      (file) => file.indexOf('.') !== 0
      && file !== basename(__filename)
      && file.slice(-3) === '.js',
    );

  for await (const file of files) {
    const model = await import(`./${file}`);
    const namedModel = model.default(sequelize, DataTypes);
    db[namedModel.name] = namedModel;
  }

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
