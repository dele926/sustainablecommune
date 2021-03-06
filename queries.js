const Pool = require('pg').Pool;
//const connectionString = 'postgres://xcqtoyzzdrwejn:c58307a93c448b0f3a1d1a373bbc2e28f867c446cda614e8d43303e474784813@ec2-54-90-13-87.compute-1.amazonaws.com:5432/d3hsauj8i8ok81';
const pool = new Pool({
  //const connectionString = 'postgres://xcqtoyzzdrwejn:c58307a93c448b0f3a1d1a373bbc2e28f867c446cda614e8d43303e474784813@ec2-54-90-13-87.compute-1.amazonaws.com:5432/d3hsauj8i8ok81',
  user: 'xcqtoyzzdrwejn',
  host: 'ec2-54-90-13-87.compute-1.amazonaws.com',
  database: 'd3hsauj8i8ok81',
  password: 'c58307a93c448b0f3a1d1a373bbc2e28f867c446cda614e8d43303e474784813',
  port: 5432,
  "ssl": {
      "rejectUnauthorized": false,
  },
});

const getUsers = (request, response) => {
  pool.query('select * from inventory', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
    console.log(results.rows);
  })
}

module.exports = {
  getUsers,
}