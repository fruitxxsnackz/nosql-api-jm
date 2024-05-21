const router = require('express').Router();

const {
    getuser,
    addusers,
    userIDs,
    userupdates,
    deleteusers,
    addingusers,
    deletingusers
} = require('../../controllers/usercontroller');

router.route('/')
.get(getuser)
.post(addusers);

router.route('/:id')
.get(userIDs)
.put(userupdates)
.delete(deleteusers);

router.route('/:id/friends/:friendID')
.post(addingusers)
.delete(deletingusers)

module.exports = router;