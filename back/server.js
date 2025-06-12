const app = require('./src/app');
const connectDB = require('./src/config/DDBB');
const config = require('./src/config/config');


connectDB();

app.listen(config.DB_PORT , () => {
    console.log(`server running in port: ${config.DB_HOST} ${config.DB_PORT}`);
})