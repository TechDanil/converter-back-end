import express from 'express';
import * as dotenv from 'dotenv';
import router from './routes/routes';
dotenv.config(); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
