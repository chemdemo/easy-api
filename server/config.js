const config = {
    nodeEnv: process.env.NODE_ENV || 'development',
    webConcurrency: process.env.WEB_CONCURRENCY || 1,
    port: process.env.PORT || 5000,
    timeout: 29000
}

module.exports = config
