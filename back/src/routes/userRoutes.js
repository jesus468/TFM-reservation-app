const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');



router.get('/getAllUser', userController.getUsers);
router.delete('/deleteUser/:email',  /*validate that rol is not client,*/ userController.removeUser);
router.post('/newUser', userController.newUser);

router.post('/login', userController.login);

router.post('/reservation/new', /*validate that is logged ,*/ userController.newReservation);
router.delete('/reservation/delete/:id', /*validate that is logged ,*/ userController.removeReservation );
module.exports = router;