module.exports = {
  mlabUrl: `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}.mlab.com:${process.env.DB_PORT}/${process.env.DB_NAME}`
}
