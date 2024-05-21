const router = require('express').Router();
const apiroutes = require('./api');

router.use('/api', apiroutes);

router.use((req, res) => res.send('Code error'));
module.exports = router;