const nuevoUsuario = {
    name: 'luis',
    secondName : 'miguel',
    mobileNum: 654545854,
    email : 'luismi@gmail.com',
    password : '!sdddd4dd'
}

const nuevaReserva = {
    name: 'dos ejemplo',
    diners: 3,
    deposit: 0,
    date: new Date('2025-06-15'),
    plates : []
}

const tryLogin = {
    email: 'luismi@gmail.com',
    password : '!sdddd4dd'
}


const addUser = async (datosDelUsuario) => {
    try {
        const response = await fetch('http://localhost:3000/api/newUser', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(datosDelUsuario)
        });
        const data = await response.json();

        if(data.success==='OK'){
            console.log('/-- usuario creado con exito --/');
        }else{
            if(data.message==='Password Invalid'){
                console.log('contraseña invalida');
                console.log(data.data);
                if(data.data.length>0){
                    data.data.forEach = (el => console.log(el));
                }
            }else if(data.message==='Email already used'){
                console.log('Este correo ya está registrado');
            }

            if(data.errorList){
                if(data.errorList.length>0){
                data.errorList.forEach(el => console.log(el.msg));
            }
            }
        }


       
    } catch (error) {
        console.error('there was an error trying add user, fetch ', error);
    }
}

const getUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/getAllUser');
        const data = await response.json();

        console.log(data);
    } catch (error) {
        console.error('there was an error in getUsers fetch', error);
    }
}

const login = async (tryLogin) => {
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(tryLogin)
        });
        data = await response.json();

        //console.log('data del login', data);

        if(data.success==='OK'){
            console.log('/-- usuario logeado con exito --/');
        }else{
            if(data.message==='Wrong password'){
                console.log('contraseña incorrecta');
            }else if(data.message==='Email not found'){
                console.log('Correo electronico no registrado');
            }

            if(data.errorList){
                if(data.errorList.length>0){
                data.errorList.forEach(el => console.log(el.msg));
            }
            }
        }
    } catch (error) {
        console.error('there was an error in login fetch', error);

    }finally{
        console.log('login fetch finalized');
    }
}

const deleteUser = async (toDeleteEmail) => {
    try {
        response = await fetch(`http://localhost:3000/api/deleteUser/${toDeleteEmail}`, {
            method : 'DELETE'
        });
        data = await response.json();

        //console.log('data fetch', data);
        if(data.status===404){
            console.log('Pagina no encontrada - (FETCH)');
        }

        if(data.success==='OK'){
            console.log(`El cliente ${toDeleteEmail} fue eliminado correctamente`);
        }else{
            if(data.message==='Email to Delete not found'){
                console.log('Este correo no está registrado');
            }
        }
    } catch (error) {
        console.log('there was an error in delete user fetch', error);
    }finally{
        console.log('delete user fect finalized');
    }
}

const crearReserva = async (datosDelaReserva) => {
    try {
        const response = await fetch('http://localhost:3000/api/reservation/new', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(datosDelaReserva)
        });
        const data = await response.json();

        //console.log('data: ' ,data)

        if(data.success==='OK'){
            console.log('/-- reserva creada con exito --/');
        }else{
            if(data.errorList){
                if(data.errorList.length>0){
                data.errorList.forEach(el => console.log(el.msg));
                }
            }

            if(data.message==='Cant add reservation'){
                console.log('hubo un error al crear la reservacion');
            }
        }
    } catch (error) {
        console.error('there was an error trying add reservation, fetch ', error);
    }
}

const deleteReserve = async (idToDelete) => {
    try {
        response = await fetch(`http://localhost:3000/api/reservation/delete/${idToDelete}`, {
            method : 'DELETE'
        });
        data = await response.json();

        //console.log('data fetch', data);
        if(data.status===404){
            console.log('Pagina no encontrada - (FETCH)');
        }

        if(data.success==='OK'){
            console.log(`La reserva ${idToDelete} fue eliminada correctamente`);
        }else{
            if(data.message==='Reserve to Delete not found'){
                console.log('Esta Id no está en las reservas');
            }
            if(data.message==='Email dont found'){
                console.log('Email no encontrado');
            }
        }
    } catch (error) {
        console.log('there was an error in delete reserve fetch', error);
    }finally{
        console.log('delete reserve fecht finalized');
    }
}
//addUser(nuevoUsuario);
//getUsers();
//login(tryLogin);
//deleteUser('carlos@yahoo.com');
//crearReserva(nuevaReserva);
deleteReserve('683c873e2dc61fe7fb27da1b')