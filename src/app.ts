import express,{Application, Request, Response} from "express"
import { userRoute } from "./modules/auth.route";


const app:Application = express();
app.use(express.json())
app.get("/",(req:Request,res:Response)=>{
res.send("rentnest server is running")
})

app.use("/api/auth",userRoute)
export default app;