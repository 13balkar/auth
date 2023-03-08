const express = require('express');
const dotenv = require('dotenv');
const app = express();
const port = 4000;
dotenv.config();
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
