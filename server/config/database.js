const mongoose=require("mongoose");

require("dotenv").config();

 
exports.dbConnect=()=>
    { 
          mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
          })
          .then(()=>
        {
            console.log("Database Connected Successfully")
        })
        .catch((err)=>
        {
            console.log("DB Connection Failed");
            console.error(err);
            process.exit(1);
        })
    }    
    