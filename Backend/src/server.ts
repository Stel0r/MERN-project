import "dotenv"
import express from "express";

const app = express();
const port = 5000;

app.get("/",(req,res) =>{
    res.send("suppa motherfucka")
});

app.listen(port,()=>{
    console.log("esta wea esta funcionando, incredibol :0 en puerto "+port.toString())
})