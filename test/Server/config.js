let config = {
  database: {
    filename: ':memory:'
  },
  server: {
    port: 3000,
    session: {
      secret: 'the answer is 42',
      resave: false,
      saveUninitialized: true,
      cookie: {}
    },
    token: {
      secret: 'token is short'
    },
    userLimiter: [/@email.com$/],
    transport: 'smtps://username:password@smtp.server.com',
    sender: '"name" <sender@server.com>',
    hostname: 'http://service.com'
  }
}

export default config
