import app from "./app"
import mongoose from "mongoose";
import env from "./util/validateEnv"

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION).then(()=>{
    console.log("Mongoose has been connected")
    app.listen(port,()=>{
        console.log("esta wea esta funcionando, incredibol :0 en puerto "+port.toString())
    })
}).catch(console.error)