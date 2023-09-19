const { Artist, validate } = require('../models/Artist');
const filter = require('../../utils/filterData');
const { User } = require('../models/User');

class ArtistController {
    // Create new Artist
    async createNewArtist(req, res) {
        const { error } = validate(req.body);
        // Validator
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        // Saving
        const newData = await new Artist(req.body).save();

        return res
            .status(200)
            .send({ data: newData, message: 'New artist was created!' });
    }

    // Get all Artist
    async getAllArtist(req, res) {
        let data = await Artist.find({ deleted: false });
        data = filter.forArtist(req, data);
        return res.status(200).send({ data });
    }

    // Get  Artist By Id
    async getArtistById(req, res) {
        let data = await Artist.findById(req.params.id);
        return res.status(200).send({ data });
    }

    // Put Artist to Favorite
    async addToFavoriteByID(req, res) {
        let data = await Artist.findById(req.params.id);
        let user = await User.findById(req.user._id);

        const isExist = user.follows.some((item) => item == data._id);
        if (isExist)
            user.follows = user.follows.filter((item) => item != data._id);
        else user.follows.push(data._id);

        // Saving
        let update = await User.findByIdAndUpdate(user._id, user);
        return res.status(200).send({ data: user.follows });
    }

    // Edit Artist by ID
    async editArtistById(req, res) {
        let target = await Artist.findById(req.params.id);
        let updateData = Object.assign(target, req.body);
        let newData = await Artist.findByIdAndUpdate(req.params.id, updateData);

        return res
            .status(200)
            .send({ data: newData, message: 'Edit artist successfull!' });
    }

    // Deleted Artist by ID
    async deletedArtistById(req, res) {
        let target = await Artist.findById(req.params.id);
        target.deleted = true;

        let newData = await Artist.findByIdAndUpdate(req.params.id, target);

        return res
            .status(200)
            .send({ data: newData, message: 'Artist was deleted!' });
    }
}

module.exports = new ArtistController();
