const candidateRouter = require('express').Router();
const { authenticateUser } = require('../middleware');
const {
  createCandidateController,
  fetchCandidateController,
} = require('./candidate.controller');
const { validateCreateCandidateDataBody } = require('./candidate.middleware');

candidateRouter.get('/', (_req, res) => {
  res.json({ candidateRoute: 'ok' });
});

candidateRouter.post(
  '/',
  authenticateUser,
  validateCreateCandidateDataBody,
  createCandidateController,
);
candidateRouter.get('/:id', authenticateUser, fetchCandidateController);

module.exports = candidateRouter;
