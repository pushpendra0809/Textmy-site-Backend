import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import express from "express"
import ConnectedDb from "./DB/DB.js";
import web from "./Routes/Routes.js";
import "./Modal/UserSchema.js"
import path from 'path';
import { fileURLToPath } from 'url';  

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ;

const DATABASE_URL = process.env.DATABASE_URL
ConnectedDb(DATABASE_URL)


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/uploads', express.static(path.join(__dirname, 'ImageUploader/uploads')));

app.get("/" ,(req,res)=>{
    res.send("Hello Pushpendra congrats for your your first connection")
})


app.use("/user",web);

app.listen(PORT, ()=>{
    console.log(`sever successfully connected at http://localhost:${PORT}`)
})