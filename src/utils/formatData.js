const tranform = require('./tranformMongoes');

class FormatData {
    forSong(songs, artists) {
        songs = tranform.forArray(songs);
        artists = tranform.forArray(artists);

        // Mapping
        songs.map((song, idxSong) => {
            song.artist.map((artSong, idxArt) => {
                let artist = artists.find((art) => art._id == artSong);
                if (artist) {
                    songs[idxSong].artist[idxArt] = {
                        artId: artSong,
                        artName: artist.name,
                        artAvt: artist.avatar,
                    };
                }
                return;
            });
        });
        return songs;
    }
    forComment(comments, users) {
        // Tranform
        comments = tranform.forArray(comments);
        users = tranform.forArray(users);

        // Logic
        comments.map((comment, idx) => {
            const user = users.find((user) => user._id == comment.owner);
            // Mapping with user
            comments[idx] = {
                ...comment,
                nameOwner: user.name,
                avtOwner: user.avatar,
            };
        });

        // Mapping with
        comments.map((comment, idx) => {
            if (comment.reply) {
                let parentIdx = comments.findIndex(
                    (item) => comment.reply == item._id,
                );

                // Check đã khởi tạo mảng replies chưa
                if (!comments[parentIdx].replies)
                    comments[parentIdx].replies = [];

                // Push
                comments[parentIdx].replies.push(comment);

                // Xóa chính nói đi
                comments.splice(idx, 1);
            }
        });

        return comments;
    }
    forPlaylist(playlist, user, artists, songs) {
        playlist = tranform.forObject(playlist);
        songs = this.forSong(songs, artists);
        // Matching with user
        playlist.owner = {
            id: user._id,
            name: user.name,
        };
        // Mathching with song
        playlist.songs.map((songInPlaylist, idx) => {
            let song = songs.find((song) => song._id == songInPlaylist);
            playlist.songs[idx] = song;
        });
        // Matching with artist
        playlist.artists.map((artInPlaylist, idxArt) => {
            let artist = artists.find((art) => art._id == artInPlaylist);
            playlist.artists[idxArt] = {
                id: artInPlaylist,
                name: artist.name,
            };
        });
        return playlist;
    }
    forMutiplePlaylist(playlists, artists) {
        playlists = tranform.forArray(playlists);
        artists = tranform.forArray(artists);

        // Mathping with artist
        playlists.map((playlist, idxPlaylist) => {
            playlist.artists.map((artInPlaylist, idxArt) => {
                let artist = artists.find((art) => art._id == artInPlaylist);
                playlists[idxPlaylist].artists[idxArt] = {
                    id: artInPlaylist,
                    name: artist.name,
                };
            });
        });

        return playlists;
    }
}

module.exports = new FormatData();
