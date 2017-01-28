function storeResetCode (code, email) {
  let query = `INSERT INTO resetcodes (code, email) VALUES ('${code}','${email}')`

  return this.exec(query)
  .then((result) => {
    return Promise.resolve(result)
  })
  .catch((error) => {
    if (error.message === 'SQLITE_ERROR: no such table: activationcodes') {
      return Promise.reject(new Error('no resetcodes table found'))
    }
  })
}

function verifyResetCode (code) {
  let query = `SELECT email FROM resetcodes WHERE code='${code}'`

  return new Promise((resolve, reject) => {
    this.database.get(query, (error, row) => {
      if (error) reject(error)
      if (!error) {
        if (row === undefined) reject(new Error('reset code not found'))
        if (row) resolve(row.email)
      }
    })
  })
}

export {storeResetCode, verifyResetCode}