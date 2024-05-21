const router = require('express').Router();

const {
    getthoughts,
    thoughtsID,
    newthoughts,
    refreshthoughts,
    deleteThought,
    addingreact,
    deletingreact
} = require('../../controllers/thoughtscontroller');

router.route('/')
.get(getthoughts)

router.route('/:userId')
.post(newthoughts)

router.route('/:thoughtId')
.get(thoughtsID)
.put(refreshthoughts)
.delete(deleteThought)

router.route('/:thoughtId/reactions')
.post(addingreact)

router.route('/:thoughtId/reactions/:reactionId')
.delete(deletingreact)

module.exports = router;