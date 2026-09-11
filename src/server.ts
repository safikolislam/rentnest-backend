
import "dotenv/config"

import { prisma } from "./lib/prisma";
import app from "./app";
const PORT = process.env.PORT ;



async function main(){
     try{
        await prisma.$connect();
         console.log("conneted to the database successfully");
         app.listen(PORT,()=>{
            // console.log(`Server is running on port ${PORT}`);
     })
     }catch(error){
    // console.error("Error starting the server:",error)
        //  process.exit(1);
    }
}


main();