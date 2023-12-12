const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors')

const app = express();
const port= process.env.PORT || 3000;
const nodeEnv= process.env.NODE_ENV;
const mySetting= process.env.MY_SETTING;



app.use(cors())

app.use(express.json());   
app.use(express.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/upload-file", upload.single('file'), (req, res) => {
    fs.writeFileSync(`./picture/${req.body.id}-${req.file.originalname}`,  req.file.buffer);
    res.end();
})

app.use((req, res) => {
    res.status(404) 
    res.json({error: "Page Not Found"})
})

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500);
    res.json({error: "500 Internal Server Error"})
});

app.listen(port, () => {
    console.log("Server started successfully")
});
