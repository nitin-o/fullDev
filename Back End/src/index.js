import DataBase_Connection from "./DataBase/index.js";
import app from "./app.js";
import { PORT } from "./constants.js";



try {
    
    DataBase_Connection()
    .then(()=>{
        app.on("error",()=>{console.log(`app.on in src/index.js is error by nitin code :- ${error}`)})
        app.listen(PORT,()=>{console.log(PORT);
        });
    })
    .catch((err)=>{console.log("DataBase_Connection feilde :-" , err)})
    
    
    
} catch (error) {
    console.log(error.message);
    
}
