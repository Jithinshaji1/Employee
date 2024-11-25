const Mongoose=require('mongoose')
const AdminSchema= new Mongoose.Schema(
    {
        Name:{type:String,
            require:true
        },
        password:{type:String,
            minlength:6,
            maxlength:10,
            require:true
        }
    }
)

module.exports=Mongoose.model('Admin',AdminSchema)