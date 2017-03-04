/* eslint-env mocha */
const assert = require('assert')
const Database = require('../../src/Database/main.js')

describe('authentication', () => {
  let config = {
    filename: ':memory:'
  }

  let database
  let credential = {
    email: 'example@email.com',
    password: 'password'
  }
  beforeEach(() => {
    database = new Database(config)
  })

  afterEach(() => {
    database.close()
  })

  it('createUser should throw error when "user" table is not found', () => {
    return database.createUser(credential)
    .catch((error) => {
      assert.equal(error.message, 'no user table found')
    })
  })
  it('createUser should add an inactive credential into users table', () => {
    return database.createTables()
    .then((status) => {
      return database.createUser(credential)
    })
    .then((status) => {
      assert(status)
      return database.get(`SELECT email, password, active FROM users`)
    })
    .then((row) => {
      assert.equal(row.active, 0)
      delete row.active
      assert.deepEqual(row, credential)
    })
    .catch((error) => {
      throw new Error(error)
    })
  })

  it('authenticate should reject if user is not activated', () => {
    return database.createTables()
    .then(() => {
      return database.createUser(credential)
    })
    .then(() => {
      return database.authenticate(credential)
    })
    .then((user) => {
      assert(user, credential.username)
    })
    .catch((error) => {
      assert.equal(error.message, 'user is not active')
    })
  })
  it('authenticate should reject if credential does not match', () => {
    return database.createTables()
    .then(() => {
      return database.authenticate(credential)
    })
    .catch((error) => {
      assert.equal(error.message, 'credential does not match')
    })
  })
  it('authenticate should resolve if credential match and user is active', () => {
    return database.createTables()
    .then(() => {
      return database.createUser(credential)
    })
    .then(() => {
      return database.activateUser(credential.email)
    })
    .then(() => {
      return database.authenticate(credential)
    })
    .then((user) => {
      assert(user, credential.username)
    })
    .catch((error) => {
      throw new Error(error)
    })
  })

  it('validateEmail should reject no email is found')
  it('validateEmail should resolve if email is found')
})
