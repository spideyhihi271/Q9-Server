const { User } = require('../models/User');
const { Song } = require('../models/Song');
const { Playlist } = require('../models/Playlist');
const { Artist } = require('../models/Artist');
const formatData = require('../../utils/formatData');
const filter = require('../../utils/filterData');
const tranform = require('../../utils/tranformMongoes');

class UserController {
    async getData(req, res) {
        let user = await User.findById(req.user._id);
        if (!user)
            return res.status(400).send({ message: 'Can find your accounts' });

        // Return data
        user = tranform.forObject(user);
        user.password = undefined;

        return res.status(200).send({ data: user });
    }

    async getHistorySong(req, res) {
        let user = await User.findById(req.user._id);
        if (!user)
            return res.status(400).send({ message: 'Can find your accounts' });

        // Get Songs
        let songs = [];
        for (const songId of user.historySongs) {
            let item = await Song.findById(songId);
            songs.push(item);
        }
        let artists = await Artist.find({});

        // Format Data
        songs = formatData.forSong(songs, artists);

        return res.status(200).send({ data: songs.reverse() });
    }

    async getHistoryPlaylist(req, res) {
        let user = await User.findById(req.user._id);
        if (!user)
            return res.status(400).send({ message: 'Can find your accounts' });

        // Get Songs
        let playlists = [];
        for (const playlistId of user.historyPlaylist) {
            let item = await Playlist.findById(playlistId);
            playlists.push(item);
        }
        let artists = await Artist.find({});

        // Format Data
        playlists = formatData.forMutiplePlaylist(playlists, artists);

        return res.status(200).send({ data: playlists.reverse() });
    }

    async getLikeSong(req, res) {
        let user = await User.findById(req.user._id);
        if (!user)
            return res.status(400).send({ message: 'Can find your accounts' });

        // Get Songs
        let songs = [];
        for (const songId of user.likeSongs) {
            let item = await Song.findById(songId);
            songs.push(item);
        }
        let artists = await Artist.find({});

        // Format Data
        songs = formatData.forSong(songs, artists);

        return res.status(200).send({ data: songs.reverse() });
    }

    async getMyPlaylist(req, res) {
        let user = await User.findById(req.user._id);
        if (!user)
            return res.status(400).send({ message: 'Can find your accounts' });

        // Get Songs
        let playlists = await Playlist.find({ deleted: false });
        playlists = playlists.filter((playlist) => playlist.owner == user._id);
        let artists = await Artist.find({});
        playlists = formatData.forMutiplePlaylist(playlists, artists);

        return res.status(200).send({ data: playlists.reverse() });
    }

    async getFavoriteSong(req, res) {
        let user = await User.findById(req.user._id);
        if (!user)
            return res.status(400).send({ message: 'Can find your accounts' });

        // Get Songs
        let songs = [];
        for (const songId of user.favoriteSongs) {
            let item = await Song.findById(songId);
            songs.push(item);
        }
        let artists = await Artist.find({});

        // Format Data
        songs = formatData.forSong(songs, artists);

        return res.status(200).send({ data: songs.reverse() });
    }

    async getFavoritePlaylist(req, res) {
        let user = await User.findById(req.user._id);
        if (!user)
            return res.status(400).send({ message: 'Can find your accounts' });

        // Get Songs
        let playlists = [];
        for (const playlistId of user.favoritePlaylists) {
            let item = await Playlist.findById(playlistId);
            playlists.push(item);
        }
        let artists = await Artist.find({});

        // Format Data
        playlists = formatData.forMutiplePlaylist(playlists, artists);

        return res.status(200).send({ data: playlists.reverse() });
    }
}

module.exports = new UserController();
