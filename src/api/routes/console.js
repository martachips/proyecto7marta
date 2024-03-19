const { isAdmin, isAuth } = require('../../../middlewares/auth');
const {
  getConsoles,
  getConsoleByID,
  postConsole,
  putConsole,
  deleteConsole
} = require('../controllers/console');

const consolesRouter = require('express').Router();

consolesRouter.get('/:id', getConsoleByID);
consolesRouter.get('/', getConsoles);
consolesRouter.post('/', postConsole);
consolesRouter.put('/:id', putConsole);
consolesRouter.delete('/:id', [isAdmin], deleteConsole);

module.exports = consolesRouter;
