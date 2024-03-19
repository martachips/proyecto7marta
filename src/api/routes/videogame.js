const { isAdmin, isAuth } = require('../../../middlewares/auth');
const {
  getVideogames,
  getVideogameByID,
  getVideogameAdmin,
  getVideogameByCategory,
  postVideogame,
  putVideogame,
  deleteVideogame
} = require('../controllers/videogame');

const videogamesRouter = require('express').Router();

//videogamesRouter.get("/not-verified", [isAdmin], getVideogameAdmin);
videogamesRouter.get('category/:category', getVideogameByCategory);
videogamesRouter.get('/:id', getVideogameByID);
videogamesRouter.get('/', getVideogames);
videogamesRouter.post('/', postVideogame);
videogamesRouter.put('/:id', putVideogame);
videogamesRouter.delete('/:id', [isAuth], deleteVideogame);

module.exports = videogamesRouter;
