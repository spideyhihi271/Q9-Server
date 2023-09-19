const authRouter = require('./auth');
const songRouter = require('./song');
const categoryRouter = require('./category');
const artistRouter = require('./artist');
const commentRouter = require('./comment');
const playlistRouter = require('./playlist');
const userRouter = require('./user');
const searchRouter = require('./search');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/song', songRouter);
    app.use('/api/playlist', playlistRouter);
    app.use('/api/category', categoryRouter);
    app.use('/api/artist', artistRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/user', userRouter);
    app.use('/api/search', searchRouter);
}

module.exports = route;
