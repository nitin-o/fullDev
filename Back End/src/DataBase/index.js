import mongoose from "mongoose";
import { DATABASE_NAME,DATABASE_URL} from "../constants.js"

const DataBase_Connection = async() =>{
    

try {
    const connectionInstructions = await mongoose.connect(`${DATABASE_URL}/${DATABASE_NAME}`)    
    console.log(`Nitin in log :- ****************** ${connectionInstructions.connections[0].host} **********************/DataBase/index.js`);
    
    
} catch (error) {
    console.log(error);
    
     console.log("DataBase_Connection feilde");
     console.error("process exit the app is crashed by :- process.exit(1) ");
     
     process.exit(1)
    
}

}

export default DataBase_Connection 