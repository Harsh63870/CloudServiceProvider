require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/database/db');

const PORT = process.env.PORT || 3000;

async function startServer() {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server chal raha hai → http://localhost:${PORT}`);
    });
}

startServer();
