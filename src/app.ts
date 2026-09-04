
import express,{ Application, Request, Response } from "express";
import { authRoutes } from "./modules/auth/auth.routes";


const app:Application = express();
app.use(express.json())
app.get("/",(req:Request,res:Response)=>{
res.send("rentnest server is running")
})

app.use("/api/auth",authRoutes)

export default app;