/* eslint-disable import/no-dynamic-require */
require('dotenv').config();
let shouldEnvCheck = true;
const failedVars = [];
let config = '';
const requiredVariables = [
  'NODE_ENV',
  'DB_URL',
  'DB_NAME',
  'PORT'
];

const validateEnvVars = () => {
  let isfailed = false;
  const envVars = Object.keys(process.env);
  requiredVariables.map(i => {
    if (!(envVars.includes(i))) {
      isfailed = true
      failedVars.push(i);
    }
  })
  return isfailed;
};

if (shouldEnvCheck) {
  const failed = validateEnvVars();
  if (failed) {
    console.error('[ENVs Not found]: ', failedVars.join(', '))
    process.exit();
  }
  shouldEnvCheck = false;
}


if (!config) config = require(`./${process.env.NODE_ENV}`);

module.exports = config;
