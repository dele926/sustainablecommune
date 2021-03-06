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
  pool.query('select * from merchants', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email } = request.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${result.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}