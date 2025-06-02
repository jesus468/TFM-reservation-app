const app = require('./src/app');
const connectDB = require('./src/config/DDBB');
const port = 3000;
//import config

connectDB();

app.listen(port , () => {
    console.log(`server running in port: ${port}`);
})