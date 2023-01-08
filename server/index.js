const express = require('express');
const playerRouter = require('./routers/playerRouter');
const PORT = process.env.PORT || 8080;
const app = express();
const multer = require('multer');
const upload = multer(); //Позволяет принимать FormData

app.use(express.json());
app.use('/api', upload.none(), playerRouter);

app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});
