const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const algorith = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32);	
const vi = crypto.randomBytes(16);

const getAllUsers = () => {
    try {
        const allUser = User.find();
        return allUser;
    } catch (error) {
        console.error('there was an error in getAllUser services');
    }finally{
        console.log('get users services finalized');
    }
}
const createUser = async (userData) => {
    const {password, email, role, mobileNum, ...anotherData} = userData;
    try {
        let hashedRole;
        if(!role){
            const defaultRole = 'client';
            hashedRole = await bcrypt.hash(defaultRole, 10);
        }else{
            hashedRole = await bcrypt.hash(role, 10);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedEmail = await bcrypt.hash(email, 10);
        
        const hashedMobileNum = encryptPhoneNumber(mobileNum);

        const newUser = new User({
            ...anotherData,
            password : hashedPassword,
            email: hashedEmail,
            mobileNum : hashedMobileNum,
            role : hashedRole
        });

        const create = await newUser.save();
        console.log(`user ${userData.name} created successfully`);
        return create;
    } catch (error) {
       console.log('Error in create user services:', error);
    }finally{
        console.log('createUser finalized (services)');
    }
}
const deleteUser = async (emailUser) => {
    try {
        const removing = await User.deleteOne({email : emailUser})
        console.log(`the user with email: ${emailUser}, was successfully deleted`);
        return removing;
    } catch (error) {
       console.log('Error in delete user services:', error);
    }finally{
        console.log('delete User finalized (services)');
    }
}
const foundByEmail = async (emailUser) => {

    console.log('email user llegando al services: ',emailUser);
    try {
        //const hashedEmailUser = bcrypt.hash(emailUser, 10);
        const emails = await User.find({}, 'email password reservation name _id');
        for(const el of emails){
            const match = await bcrypt.compare(emailUser, el.email);
            if(match){
                return el;
            }
        }


    } catch (error) {
       console.log('Error in foundEmail services:', error);
    }finally{
        console.log('foundEmail finalized (services)');
    }
}
const createReservation = async (user ,reservationData) => {
    try {
        user.reservation.push(reservationData);

        const withNewReservation = {
            reservation: user.reservation
        }

        const saved = await User.findOneAndUpdate({email : user.email}, withNewReservation);

        console.log('saved: ', saved);
        return saved;

    } catch (error) {
       console.log('Error in create Reservation services:', error);
    }finally{
        console.log('createReservation finalized (services)');
    }
}
const deleteReservation = async (user, reservId) => {
    try {
        console.log('el reservation services: ', user.reservation);
        user.reservation.forEach( el => console.log(el._id.toString()));

        const newArray = user.reservation.filter(el => el._id.toString()!==reservId);
        console.log('filtred del services' ,newArray); 

        const toUpdate = {
            reservation : newArray
        }

        const reservations = await User.findOneAndUpdate({email : user.email}, toUpdate);
        
        console.log('reservations services', reservations);

        return reservations;
    } catch (error) {
       console.log('Error in delete Reservation services:', error);
    }finally{
        console.log('deleteReservation finalized (services)');
    }
}
const modifyReservation = async (user ,reserveNewData, reserveId) => {
    try {
        if(!reserveNewData){
            throw new Error('there are no data to update in services');
        }

        if(!reserveId){
            throw new Error('there are no id for update in services');
        }

        if(!user){
            throw new Error('there are no an user for update in services');
        }
/*
        console.log('user: ', user);
        console.log('reserveID: ', reserveId);
*/
        const reserveToUpdate = user.reservation.filter(el => el._id.toString() !== reserveId);
        /*
        console.log('reserveToUpdate: ' ,reserveToUpdate);
*/
        

        reserveToUpdate.push(reserveNewData);
        //console.log('reserveToUpdate: con el nuevo update' ,reserveToUpdate);

        const toUpdate = {
            reservation : reserveToUpdate
        }

        const updated = User.findOneAndUpdate({email : user.email}, toUpdate);
        return updated;

    } catch (error) {
       console.log('Error in modify Reservation services:', error);
    }finally{
        console.log('modifyReservation finalized (services)');
    }
}



const encryptPhoneNumber = (toEncrypt) =>{
    const cipher = crypto.createCipheriv(algorith, secretKey, vi);
    const encrypted = Buffer.concat([
        cipher.update(toEncrypt.toString(), 'utf-8'),
        cipher.final()
    ]);

    return `${vi.toString('hex')}--${encrypted.toString('hex')}`
}
const decryptPhoneNumber = (toDecrypt) => {
    const splitedData = toDecrypt.split('--');
    const decipher = crypto.createDecipheriv(
    algorith,
    secretKey,
    Buffer.from(splitedData[0], 'hex')
  );
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(splitedData[1], 'hex')),
    decipher.final(),
  ]);
  return decrypted.toString('utf8');
}

module.exports = {
    getAllUsers,
    createUser,
    foundByEmail,
    deleteUser,
    createReservation,
    deleteReservation,
    modifyReservation
};