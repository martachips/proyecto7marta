const Console = require('../models/console');

const getConsoles = async (req, res, next) => {
  try {
    const consoles = await Console.find();
    return res.status(200).json(consoles);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const getConsoleByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const console = await Console.findById(id);
    return res.status(200).json(console);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const postConsole = async (req, res, next) => {
  try {
    const newConsole = new Console(req.body);
    const savedConsole = await newConsole.save();
    return res.status(201).json(savedConsole);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

const putConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const previousConsole = await Console.findById(id);
    const newConsole = await Console(req.body);
    newConsole._id = id;
    newConsole.videogames = [
      ...previousConsole.videogames,
      ...req.body.videogames
    ];
    const updatedConsole = await Console.findByIdAndUpdate(id, newConsole, {
      new: true
    });
    return res.status(200).json(updatedConsole);
  } catch {
    return res.status(400).json('Request error');
  }
};

const deleteConsole = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedConsole = await Console.findByIdAndDelete(id);
    return res.status(200).json(deletedConsole);
  } catch (error) {
    return res.status(400).json('Request error');
  }
};

module.exports = {
  getConsoles,
  getConsoleByID,
  postConsole,
  putConsole,
  deleteConsole
};
