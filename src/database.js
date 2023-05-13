import {connect} from 'mongoose'

(async()=>{
    try{
        const db = await connect("mongodb+srv://sa:12345@cluster0.0ifpfe7.mongodb.net/MascotasDB")
        console.log('DB connrcted to', db.connection.name)  
    }catch(error){
        console.error(error);
    }
      
})();

