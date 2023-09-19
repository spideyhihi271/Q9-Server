const { Song } = require('../models/Song');
const { Artist } = require('../models/Artist');
const { Playlist } = require('../models/Playlist');
const { User } = require('../models/User');
const formatData = require('../../utils/formatData');
const convertToLowerCaseVN = require('../../utils/convertVNString');

class SearchController {
    async searchByKeyword(req, res) {
        let keyword = req.params.keyword;
        let songs = await Song.find();
        let artists = await Artist.find();
        let playlists = await Playlist.find({ createdByAdmin: true });
        let users = await User.find();

        // Search
        let songResult = songs.filter((song) =>
            convertToLowerCaseVN(song.name)
                .toLocaleLowerCase()
                .includes(keyword),
        );
        let playlistResult = playlists.filter((playlist) =>
            convertToLowerCaseVN(playlist.name)
                .toLocaleLowerCase()
                .includes(keyword),
        );
        let artistResult = artists.filter((item) =>
            convertToLowerCaseVN(item.name)
                .toLocaleLowerCase()
                .includes(keyword),
        );

        // Format
        songResult = formatData.forSong(songResult, artists);
        playlistResult = formatData.forMutiplePlaylist(
            playlistResult,
            artists,
            users,
        );

        return res.status(200).send({
            data: [songResult, playlistResult, artistResult],
        });
    }
}

module.exports = new SearchController();
