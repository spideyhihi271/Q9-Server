const { Song, validate } = require('../models/Song');
const { Artist } = require('../models/Artist');
const { User } = require('../models/User');
const formatData = require('../../utils/formatData');
const filter = require('../../utils/filterData');

class SongController {
    // Create new Song
    async createSong(req, res) {
        const { error } = validate(req.body);

        // Validator
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Saving
        const newSong = await new Song(req.body).save();

        return res
            .status(200)
            .send({ data: newSong, message: 'Your song was uploaded!' });
    }
    // Edit
    async editSong(req, res) {
        let song = await Song.findById(req.params.id);
        let updateSong = Object.assign(song, req.body);
        let updateData = await Song.findByIdAndUpdate(song._id, updateSong);

        return res
            .status(200)
            .send({ data: updateSong, message: 'Edit song successfull!' });
    }
    // Deleted
    async deletedSong(req, res) {
        let song = await Song.findById(req.params.id);
        song.deleted = true;
        let updateData = await Song.findByIdAndUpdate(song._id, song);

        return res
            .status(200)
            .send({ data: song, message: 'Deleted song successfull!' });
    }
    // Get all Song
    async getAllSong(req, res) {
        let songs = await Song.find({ deleted: false });
        const artists = await Artist.find({});

        // Tranform
        songs = formatData.forSong(songs, artists);
        songs = filter.forSong(req, songs);
        return res.status(200).send({ data: songs });
    }

    // Get Song by ID
    async getSongById(req, res) {
        let songs = await Song.find({ _id: req.params.id, deleted: false });
        let artists = await Artist.find({});
        let user = await User.findById(req.user?._id);

        // +1 view
        let song = songs[0];
        song.views += 1;
        let updateView = await Song.findByIdAndUpdate(song._id, song);

        // +1 history
        if (user) {
            user.historySongs = user.historySongs.filter(
                (item) => item != song._id,
            );
            user.historySongs.push(song._id);
            let updateHistory = await User.findByIdAndUpdate(user._id, user);
        }

        // Tranform
        songs = formatData.forSong(songs, artists);

        return res.status(200).send({ data: songs[0] });
    }

    // Like Song
    async likeSongById(req, res) {
        let user = await User.findById(req.user._id);
        let song = await Song.findById(req.params.id);
        //Check exist
        if (!song)
            return res.status(400).send({
                message: 'Song is not exist',
            });
        // Remove on Dislike
        user.dislikeSongs = user.dislikeSongs.filter(
            (song) => song != req.params.id,
        );
        // Remove if like before
        let idx = user.likeSongs.findIndex((song) => song == req.params.id);
        if (idx === -1) user.likeSongs.push(req.params.id);
        else
            user.likeSongs = user.likeSongs.filter(
                (song) => song != req.params.id,
            );

        // Saving
        let updateUser = await User.findByIdAndUpdate(user._id, user);

        return res.status(200).send({
            message: 'Like successful!',
        });
    }

    // Dislike Song
    async dislikeSongById(req, res) {
        let user = await User.findById(req.user._id);
        let song = await Song.findById(req.params.id);
        //Check exist
        if (!song)
            return res.status(400).send({
                message: 'Song is not exist',
            });
        // Remove on like
        user.likeSongs = user.likeSongs.filter((song) => song != req.params.id);
        // Remove if like before
        let idx = user.dislikeSongs.findIndex((song) => song == req.params.id);
        if (idx === -1) user.dislikeSongs.push(req.params.id);
        else
            user.dislikeSongs = user.dislikeSongs.filter(
                (song) => song != req.params.id,
            );

        // Saving
        let updateUser = await User.findByIdAndUpdate(user._id, user);

        return res.status(200).send({
            message: 'Dislike successful!',
        });
    }

    // Save on Favorite
    async saveOnFavorite(req, res) {
        let user = await User.findById(req.user._id);
        let song = await Song.findById(req.params.id);
        //Check exist
        if (!song)
            return res.status(400).send({
                message: 'Song is not exist',
            });
        // Check save before
        let idx = user.favoriteSongs.findIndex((song) => song == req.params.id);
        if (idx === -1) user.favoriteSongs.push(req.params.id);
        else
            user.favoriteSongs = user.favoriteSongs.filter(
                (song) => song != req.params.id,
            );
        // Saving
        let updateUser = await User.findByIdAndUpdate(user._id, user);
        return res.status(200).send({
            message: 'Add to favorite successful!',
        });
    }
}

module.exports = new SongController();
