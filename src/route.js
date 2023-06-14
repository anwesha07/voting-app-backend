// the main router which will route the requests to each module

const router = require('express').Router();

router.get('/', (_req, res) => {
  res.json({ route: 'ok' });
});

module.exports = router;
