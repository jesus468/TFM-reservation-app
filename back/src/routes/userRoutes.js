const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');



router.get('/getAllUser', userController.getUsers);
router.delete('/deleteUser/:email',  /*validate that rol is not client,*/ userController.removeUser);
router.post('/newUser', userController.newUser);

router.post('/login', userController.login);

router.post('/reservation/new', /*validate that is logged ,*/ userController.newReservation);
router.delete('/reservation/delete/:id', /*validate that is logged ,*/ userController.removeReservation );
router.post('/reservation/modify/:id', /*validate that this is admin,*/ userController.modifyReservation)


/*
los correos que tengo que enviar son cuando:
    - se registra un usuario
    - cuando se hace una reservacion 
    - cuando faltan 2 dias para la reservacion (preguntar al cliente si quiere que se le recuerde de nuevo)
    - cuando se cancela una reservacion
    - cuando se elimina un usuario
*/


module.exports = router;