/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

// Anirudh: We don't want to write an import/require statement for
//   every schema file in SCHEMAS_DIR, so we'll use 'dynamic, non-global require'

const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');

const strUtil = require('util-fns/str_util');

const COMMON_PLUGINS_DIR = path.join(__dirname, 'plugins', 'common');
const SCHEMAS_DIR = path.join(__dirname, 'schemas');

// collect plugins that are shared across all schemas
const commonPlugins = fs.readdirSync(COMMON_PLUGINS_DIR)
  .map(file => require(path.join(COMMON_PLUGINS_DIR, file)));

// collect the schemas from SCHEMAS_DIR, add shared plugin,
//   then compile them into Mongoose models
const models = fs.readdirSync(SCHEMAS_DIR)
  .reduce((acc, file) => {
    const filename = path.parse(file).name;

    const schema = require(path.join(SCHEMAS_DIR, filename));

    commonPlugins.forEach(plugin => schema.plugin(plugin));

    const modelName = strUtil.capitalizeFirstLetter(filename);

    acc[modelName] = mongoose.model(modelName, schema);
    return acc;
  }, {});

module.exports = models;

/* eslint-enable global-require */
/* eslint-enable import/no-dynamic-require */
