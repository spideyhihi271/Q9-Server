module.exports = {
    forArray: (moogoes) => moogoes.map((item) => item.toObject()),
    forObject: (item) => item.toObject(),
};
