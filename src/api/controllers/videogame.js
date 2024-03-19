const Videogame = require('../models/videogame');

const getVideogames = async (req, res, next) => {
  try {
    const videogames = await Videogame.find();
    return res.status(200).json(videogames);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getVideogameByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const videogame = await Videogame.findById(id);
    return res.status(200).json(videogame);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getVideogameAdmin = async (req, res, next) => {
  try {
    const videogame = await Videogame.find({ verified: false });
    return res.status(200).json(videogame);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getVideogameByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const videogame = await Videogame.find({ category });
    return res.status(200).json(videogame);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const postVideogame = async (req, res, next) => {
  try {
    const newVideogame = new Videogame(req.body);

    // if (req.user.role === 'admin') {
    //   newVideogame.verified = true;
    // } else {
    //   newVideogame.verified = false;
    // }

    const savedVideogame = await newVideogame.save();
    return res.status(201).json(savedVideogame);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const putVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newVideogame = new Videogame(req.body);
    newVideogame._id = id;
    const updatedVideogame = await Videogame.findByIdAndUpdate(
      id,
      newVideogame,
      { new: true }
    );
    return res.status(200).json(updatedVideogame);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const deleteVideogame = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedVideogame = await Videogame.findByIdAndDelete(id);
    return res.status(200).json(deletedVideogame);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

module.exports = {
  getVideogames,
  getVideogameByID,
  getVideogameAdmin,
  getVideogameByCategory,
  postVideogame,
  putVideogame,
  deleteVideogame
};
