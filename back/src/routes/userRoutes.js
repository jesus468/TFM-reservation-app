const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const mongoSanitize = require('../middlewares/mongoSanitize');
const authValidation = require('../middlewares/authValidation');


router.get('/getAllUser',mongoSanitize,  userController.getUsers);
router.delete('/deleteUser/:email', mongoSanitize,  authValidation, userController.removeUser);
router.post('/newUser', mongoSanitize, userController.newUser);

router.post('/login', mongoSanitize, userController.login);

router.post('/reservation/new', mongoSanitize, /*validate that is logged ,*/ userController.newReservation);
router.delete('/reservation/delete/:id', mongoSanitize, /*validate that is logged ,*/ userController.removeReservation );
router.post('/reservation/modify/:id', mongoSanitize, authValidation, userController.modifyReservation)


/*
los correos que tengo que enviar son cuando:
    - se registra un usuario
    - cuando se hace una reservacion 
    - cuando faltan 2 dias para la reservacion (preguntar al cliente si quiere que se le recuerde de nuevo)
    - cuando se cancela una reservacion
    - cuando se elimina un usuario
*/


module.exports = router;