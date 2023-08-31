const authRouter = require('./auth');
const songRouter = require('./song');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/song', songRouter);
}

module.exports = route;
