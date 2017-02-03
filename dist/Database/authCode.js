'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function storeAuthCode(code) {
  var query = 'INSERT INTO authcodes (code) VALUES (\'' + code + '\')';

  return this.exec(query).then(function (result) {
    return Promise.resolve(result);
  }).catch(function (error) {
    if (error.message === 'SQLITE_ERROR: no such table: authcodes') {
      return Promise.reject(new Error('no authcodes table found'));
    }
  });
}

function verifyAuthCode(code) {
  var _this = this;

  var query = 'SELECT * FROM authcodes WHERE code=\'' + code + '\'';

  return new Promise(function (resolve, reject) {
    _this.database.get(query, function (error, row) {
      if (error) reject(error);
      if (!error) {
        if (row === undefined) reject(new Error('authorization code not found'));
        if (row) resolve(true);
      }
    });
  });
}

exports.storeAuthCode = storeAuthCode;
exports.verifyAuthCode = verifyAuthCode;