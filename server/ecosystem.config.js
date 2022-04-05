module.exports = {
    apps: [
        {
            name: 'AutoProFit',
            script: './server.js',
            env: {
                MONGO_URI:
                    'mongodb+srv://developer:k5hLfztR@cluster0.bvbuo.azure.mongodb.net/autoProFit?retryWrites=true&w=majority',
                NODE_ENV: 'production',
                PORT: 80,
                SENDGRID_API_KEY: '',
                AUTH_EXPIRES_IN: '2h'
            }
        }
    ]
}
