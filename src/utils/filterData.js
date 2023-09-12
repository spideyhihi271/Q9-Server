const tranform = require('../utils/tranformMongoes');

class Filter {
    forSong(req, data) {
        // Top Song
        if (req.query.top) data = data.sort((a, b) => b.views - a.views);

        // Releated with single
        if (req.query.artist) {
            let result = [];
            data.map((item) => {
                let idx = item.artist.findIndex(
                    (art) => art.artId == req.query.artist,
                );

                if (idx != -1) result.push(item);
            });
            data = result;
        }
        // Related with gender
        if (req.query.category)
            data = data.filter((item) => item.category == req.query.category);

        // Limit
        if (!req.query.full) {
            data = data.slice(0, 20);
        }
        return data;
    }
    forPlaylist(req, data) {
        let dataAdmin = data.filter((item) => item.createdByAdmin === true);

        let result = dataAdmin;

        if (req.query.top) {
            result = result.sort((a, b) => b.views - a.views);
        }
        if (req.query.genres) {
            result = result.filter(
                (item) => item.genres[0] == req.query.genres,
            );
        }
        if (req.query.artist) {
            result = result.filter((item) => {
                if (!item.artists || item.artists.length === 0) return false;
                return item.artists[0]?.id == req.query.artist;
            });
        }
        if (req.query.community) {
            result = data.filter((item) => item.createdByAdmin === false);
        }
        if (req.query.type) {
            result = result.filter(
                (item) => item.type === Number(req.query.type),
            );
        }
        //Limit
        if (!req.query.full) {
            result = result.slice(0, 20);
        }

        return result;
    }
    forArtist(req, data) {
        data = tranform.forArray(data);

        // Top Singer
        if (req.query.top) data = data.sort((a, b) => b.follows - a.follows);

        // Singer Related
        if (req.query.related) {
            let target = data.find((item) => item._id == req.query.related);
            data = data.filter((art) => art._id != req.query.related);
            data = data.filter(
                (artist) => artist.mainGenre === target.mainGenre,
            );
        }

        // Limit
        if (!req.query.full) {
            data = data.slice(0, 20);
        }

        return data;
    }
    forComment(req, data) {
        if (req.query.sort == 1) {
            data = data.reverse();
        } else if (req.query.sort == 2) {
            data = data.sort((a, b) => b.likes.length - a.likes.length);
        }
        return data;
    }
}

module.exports = new Filter();
