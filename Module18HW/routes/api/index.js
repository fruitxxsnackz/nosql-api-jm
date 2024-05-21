const router = require('express').Router();
const thoughtroutes = require('./routes');
const userroutes = require('./userroute');

router.use('/thoughts', thoughtroutes);
router.use('/users', userroutes);
module.exports = router; 