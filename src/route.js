// the main router which will route the requests to each module
const router = require('express').Router();
const authRouter = require('./auth/auth.route');
const candidateRouter = require('./candidate/candidate.route');
const voteEventRouter = require('./voteEvents/voteEvents.route');

router.get('/', (_req, res) => {
  res.json({ route: 'ok' });
});

router.use('/auth', authRouter);
router.use('/voteEvents', voteEventRouter);
router.use('/candidate', candidateRouter);

module.exports = router;
