const {
    getAllUsers,
    createUser,
    foundByEmail,
    deleteUser,
    createReservation,
    deleteReservation,
    modifyReservation
} = require('../services/userServices');

const {
    createUserValidation,
    loginValidation,
    deleteUserValidation,
} = require('../validations/userValidation');

const {
    createReserveValidation,
    deleteReserveValidation
} = require('../validations/reservValidation');
const handleValidation = require('../middlewares/validationResult'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userController = {
    getUsers : [
        async (req , res, next) => {
            try {
                const data = await getAllUsers();

                res.status(200).json({success : 'OK', Users: data});
            } catch (error) {
                console.error('there was an error in get Users', error);
                next(error);
            }finally{
                console.log('get Users finalized');
            }
        }
    ],
    newUser : [
        ...createUserValidation,
        handleValidation,

        async (req , res, next) => {
            const userData = req.body;
            const {email} = req.body;

            try {

                if(!validatePassword(userData.password)){
                    throw new Error('Password Invalid');
                }

                const allUsers = await getAllUsers();
                const allUsersEmail = allUsers.map(el => el.email);

                let usedEmail = false;

                for(const el of allUsersEmail){
                    const emailRequestHashed = await bcrypt.compare(email, el);
                    if(emailRequestHashed){
                        usedEmail=true;
                    }
                }

                if(!usedEmail){    
                    const data = await createUser(userData);
                    res.status(200).json({success : 'OK', userCreated: data});
                }else{
                    throw new Error('Email already used');
                }
                
            } catch (error) {
                console.error('there was an error adding new user (controller)', error.message);
                next(error);
            }finally{
                console.log('new user controller finalized');
            }
        }
    ],
    removeUser :[
        ...deleteUserValidation,
        handleValidation,
        async(req, res, next) => {
            const email = req.params;
            try {

                const allUsersEmail = await alluser(email);
                
                console.log(allUsersEmail);

                if(!allUsersEmail.length>0){
                    throw new Error('Email to Delete not found');
                }

                const dele = await deleteUser(allUsersEmail[0]);
                console.log('dele : ', dele);
                res.status(200).json({success:'OK', message:`user deleted`});
            } catch (error) {
                console.error('there was an error deleting a user (controller)', error.message);
                next(error);
            }finally{
                console.log('Delete user finalized');
            }
        }
    ],
    login: [
        ...loginValidation,
        handleValidation,
        async (req, res, next) => {

            const {email , password} = req.body;
            
            if(!email || !password){
                return res.status(400).json({ message: 'Email and password are required', data: {email:email, password: password} });
            }

            try {
                const matchedEmail = await foundByEmail(email);

                if(!matchedEmail){
                    throw new Error('Email not found');
                }

                const passwordValidate = await bcrypt.compare(password ,matchedEmail.password);
                
                console.log('passwordValidate : ', passwordValidate);

                if(!passwordValidate){
                    throw new Error ('Wrong password');
                }

                //crear la cookie
                //subir la cookie
                const token = jwt.sign(
                    {userId: matchedEmail._id ,
                    role: matchedEmail.role,
                    name: matchedEmail.name
                }, process.env.SECRET_JWT_KEY, {expiresIn : '2h'});

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true ,
                    sameSite: 'None',
                    path: '/',
                    //domain: 
                    maxAge: 2 * 60* 60 * 1000
                })

                res.status(200).json({success:'OK', message:'successfully logged in', user: matchedEmail.name , id: matchedEmail._id, mail : matchedEmail.email});

            } catch (error) {
                console.error('there was an error login (controller)', error.message);
                next(error);
            }finally{
                console.log('login controller finalized');
            }
        }

    ],
    getAllReserveOf: [
        async (req, res, next) =>{
            const {email} = req.params;

            if(!email){
                return res.status(400).json({ message: 'Email is empty'});
            }

            try {
                const userEmail = await foundByEmail(email);

                if(!userEmail){
                    return res.status(400).json({ message: 'Email not found'});
                }

                res.status(200).json({success : 'OK', user : userEmail.name , reserves : userEmail.reservation});
            } catch (error) {
                console.error('Error in get reserve', error);
                next(error)
            }
        }
    ],
    newReservation :[
        ...createReserveValidation,
        handleValidation,

        async(req, res, next) => {

            const {diners, deposit, date} = req.body;
            const {email} = req.params;
            /*
            aqui tengo que recibir el usuario (probablemente su ID) o lo localizo con el email
            
                aunque, el nombre, de la reserva, lo obtendre del login,

            una vez que tengo el usuario, añado la reserva a su array de reservas
            */
            

            try {

                const user = await(foundByEmail(email));
                const created = await createReservation(user, req.body);
                console.log('created del controller :' ,created);

                if(!created){
                    console.log('el if del controler---------');
                    throw new Error('Cant add reservation');
                }

                res.status(200).json({success:'OK', message: 'Reservation created'});

            } catch (error) {
                console.error('there was an error in new Reservation (controller)', error.message);
                next(error);
            }finally{
                console.log('new reservation controller finalized');
            }
        }
    ],
    removeReservation : [
        ...deleteReserveValidation,
        handleValidation,

        async (req, res , next) => {
            const {id , email} = req.params;

            /*
                aqui debo obtener el correo desde el login
            */
            
            try {
                console.log('id del controller' ,id);

                const user = await(foundByEmail(email));
                console.log('este es el user :',user);

                if(!user){
                    throw new Error('Email dont found');
                }

                if(user.reservation.length<=0){
                    throw new Error('There are no reservations');
                }

                const deletingReservation = await deleteReservation(user, id);
                console.log('deleting reservacion controller: ', deletingReservation);

                if(!deletingReservation){
                    throw new Error('Error deleting Reserve');
                }

                res.status(200).json({success:'OK', message: deletingReservation});
            } 
            catch (error) {
                console.error('there was an error in delete Reservation (controller)', error.message);
                next(error);
            }finally{
                console.log('delete reservation controller finalized');
            }
        }
    ],
    modifyReservation : [
        ...createReserveValidation,
        handleValidation,

        async (req, res ,next) => {
            const {name, diners, deposit, plates, date} = req.body;
            const {id, email} = req.params;
/*
            console.log('reserveId del controller:', id);
            console.log('datos llegando al req, controller: ', datosllegando);
           */ try {
                const user = await(foundByEmail(email));
                console.log('este es el user :',user);

                if(!user){
                    throw new Error('User not found');
                }

                const toUpdateReserv = {
                    name: name,
                    diners: diners,
                    deposit: deposit,
                    plates: plates,
                    date: date,
                }

                const updated = await modifyReservation(user, toUpdateReserv, id);

                res.status(200).json({success:'OK', message: updated});

            } catch (error) {
                console.error('there was an error in modify Reservation (controller)', error.message);
                next(error);
            }finally{
                console.log('modify reservation controller finalized');
            }
        }
    ]
}

const validatePassword = (passwordAttemp) => {
    const bad = [];

    if(!/[a-zA-Z]/.test(passwordAttemp)) bad.push('Need at lest a letter'); 
    if(!/\d/.test(passwordAttemp)) bad.push('Need at less a number');
    if(!/[!@#$%^&*(),.?":{}|<>]/.test(passwordAttemp)) bad.push('Need at less a Special character');
    if(passwordAttemp.length<8) bad.push('Password cant have less than 8 characters');

    if(bad.length===0){
        return true;
    }else{
        const validateError = new Error('Invalid password');
        validateError.message = 'Password Invalid';
        validateError.data = bad;

        throw validateError;
    }
}
const alluser = async (email) => {
    const allUsers = await getAllUsers();
    const allUsersEmail = allUsers.map(el => el.email);

    let usedEmail = [];

    for(const el of allUsersEmail){

        console.log('estos son los el: ',el)
        console.log('y este el email del request: ',email.email);

        const emailRequestHashed = await bcrypt.compare(email.email, el);
        if(emailRequestHashed){
            usedEmail.push(el);
        }
    }

    return usedEmail;
}
module.exports = userController;