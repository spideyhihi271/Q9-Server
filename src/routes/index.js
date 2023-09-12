const authRouter = require('./auth');
const songRouter = require('./song');
const categoryRouter = require('./category');
const artistRouter = require('./artist');
const commentRouter = require('./comment');
const playlistRouter = require('./playlist');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/song', songRouter);
    app.use('/api/playlist', playlistRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/artist', artistRouter);
    app.use('/api/comment', commentRouter);
}

module.exports = route;
