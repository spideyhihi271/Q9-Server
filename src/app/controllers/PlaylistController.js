const { Playlist, validate } = require('../models/Playlist');
const { Song } = require('../models/Song');
const { User } = require('../models/User');
const { Artist } = require('../models/Artist');
const formatData = require('../../utils/formatData');
const filter = require('../../utils/filterData');

class PlaylistController {
    // Create Playlist
    async createPlaylist(req, res) {
        let playlist = req.body;
        // Matching
        playlist = {
            ...req.body,
            owner: req.user._id,
            createdByAdmin: req.user.isAdmin,
        };

        // Validator
        const { error } = validate(playlist);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Saving
        let newPlaylist = await new Playlist(playlist).save();
        return res
            .status(200)
            .send({ data: newPlaylist, message: 'Create successfull' });
    }

    // Get Playlist
    async getAllPlaylist(req, res) {
        let playlists = await Playlist.find({ deleted: false });
        let artists = await Artist.find({});
        playlists = formatData.forMutiplePlaylist(playlists, artists);
        playlists = filter.forPlaylist(req, playlists);
        return res.status(200).send({ data: playlists });
    }

    // Get Playlist by Id
    async getPlaylistById(req, res) {
        let watcher = await User.findById(req.user?._id);
        let playlist = await Playlist.findById(req.params.id);
        let user = await User.findById(playlist.owner);
        let artists = await Artist.find({});
        let songs = [];
        for (const songId of playlist.songs) {
            let item = await Song.findById(songId);
            songs.push(item);
        }
        if (!playlist)
            return res
                .status(404)
                .send({ message: 'Can not find this playlist' });

        // +1 View
        playlist.views = playlist.views + 1;

        // Save in history
        if (watcher) {
            watcher.historyPlaylist = watcher.historyPlaylist.filter(
                (item) => item._id != playlist._id,
            );
            watcher.historyPlaylist.push(playlist._id);
            let updateHistory = await User.findByIdAndUpdate(
                watcher._id,
                watcher,
            );
        }

        playlist = formatData.forPlaylist(playlist, user, artists, songs);
        return res.status(200).send({ data: playlist });
    }

    // Add Playlist
    async addSongToPlaylist(req, res) {
        let playlist = await Playlist.findById(req.params.id);
        let song = await Song.findById(req.body.song);
        let songs = [];
        for (const songId of playlist.songs) {
            let item = await Song.findById(songId);
            songs.push(item);
        }

        // Check exist
        if (!playlist || !song)
            return res
                .status(400)
                .send({ message: 'Song or playlist is not exist' });

        // Check was added
        let idxSong = playlist.songs.findIndex((song) => song == req.body.song);
        if (idxSong === -1) {
            playlist.songs.push(req.body.song);
            songs.push(song);
        } else {
            playlist.songs = playlist.songs.filter(
                (song) => song != req.body.song,
            );
            songs.splice(idxSong, 1);
        }

        // Add Artist
        song.artist.map((artSong) => {
            let indexArtInPlaylist = playlist.artists.findIndex(
                (art) => art == artSong,
            );
            // Điều kiện: add + chưa tồn tại
            if (idxSong === -1 && indexArtInPlaylist === -1)
                playlist.artists.push(artSong);
            // Case: xóa
            else if (idxSong != -1) {
                let isExist = false;
                // Kiểm tra
                songs.map((item) => {
                    item.artist.map((art) => {
                        if (art == artSong) isExist = true;
                    });
                });
                // Case: xóa + hết nhạc
                if (isExist === false)
                    playlist.artists = playlist.artists.filter(
                        (art) => art != artSong,
                    );
            }
        });

        // Add Genres
        let indexCateInPlaylist = playlist.genres.findIndex(
            (cate) => cate == song.category,
        );
        // Điều kiện: add + chưa tồn tại
        if (idxSong === -1 && indexCateInPlaylist === -1)
            playlist.genres.push(song.category);
        // Case: xóa
        else if (idxSong != -1) {
            let isExist = false;
            // Kiểm tra
            songs.map((item) => {
                if (item.category == song.category) isExist = true;
            });
            // Case: xóa + hết nhạc
            if (isExist === false)
                playlist.genres = playlist.genres.filter(
                    (cate) => cate != song.category,
                );
        }

        // Update duration
        let duration = songs.reduce((sum, cur) => sum + cur.duration, 0);
        playlist.duration = duration;

        // Saving
        let updatePlaylist = await Playlist.findByIdAndUpdate(
            playlist._id,
            playlist,
        );

        return res
            .status(200)
            .send({ data: playlist, message: 'Song was added to playlist' });
    }

    // Edit Playlist
    async editPlaylist(req, res) {
        let playlist = await Playlist.findById(req.params.id);
        // Check exsit
        if (!playlist)
            return res.status(400).send({
                message: 'Playlist is not exist',
            });

        // Check Owner
        if (playlist.owner != req.user._id)
            return res.status(403).send({
                message: 'Access denied. You are not owner',
            });

        // Saving
        playlist = Object.assign(playlist, req.body);
        let updateData = await Playlist.findByIdAndUpdate(
            playlist._id,
            playlist,
        );
        return res
            .status(200)
            .send({ data: playlist, message: 'Edit playlist successfull' });
    }

    // Deleted Playlist
    async deletedPlaylist(req, res) {
        let playlist = await Playlist.findById(req.params.id);
        // Check exsit
        if (!playlist)
            return res.status(400).send({
                message: 'Playlist is not exist',
            });

        // Check Owner
        if (playlist.owner != req.user._id)
            return res.status(403).send({
                message: 'Access denied. You are not owner',
            });

        // Saving
        playlist.deleted = true;
        let updateData = await Playlist.findByIdAndUpdate(
            playlist._id,
            playlist,
        );
        return res
            .status(200)
            .send({ data: playlist, message: 'Deleted playlist successfull' });
    }

    // Save on Favorite
    async saveOnFavorite(req, res) {
        let user = await User.findById(req.user._id);
        let playlist = await Playlist.findById(req.params.id);

        if (!playlist)
            return res.status(400).send({
                message: 'Playlist is not exist',
            });

        // Check exist
        let idx = user.favoritePlaylists.findIndex(
            (playlist) => playlist == req.params.id,
        );

        if (idx === -1) user.favoritePlaylists.push(req.params.id);
        else
            user.favoritePlaylists = user.favoritePlaylists.filter(
                (playlist) => playlist != req.params.id,
            );

        // Saving
        let updateData = await User.findByIdAndUpdate(user._id, user);
        return res.status(200).send({
            message: 'This playlist was add to your favorite playlist',
        });
    }
}

module.exports = new PlaylistController();
