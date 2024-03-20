const { isAdmin, isAuth } = require('../../../middlewares/auth');
const {
  getVideogames,
  getVideogameByID,
  getVideogameByCategory,
  postVideogame,
  putVideogame,
  deleteVideogame
} = require('../controllers/videogame');

const videogamesRouter = require('express').Router();

videogamesRouter.get('/:id', getVideogameByID);
videogamesRouter.get('/category/:category', getVideogameByCategory);
videogamesRouter.get('/', getVideogames);
videogamesRouter.post('/', [isAuth], postVideogame);
videogamesRouter.put('/:id', [isAuth], putVideogame);
videogamesRouter.delete('/:id', [isAdmin], deleteVideogame);

module.exports = videogamesRouter;
