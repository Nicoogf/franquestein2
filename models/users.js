import { Schema , model , models} from "mongoose";

const userSchema = new Schema({
    username : {
        type : String
    },
    password: {
        type: String
    },
    dinero:{
        type: Number ,
        default : 0
    }
},{
    timestamps: true
})

const User = models.User || model("User", userSchema)
export default User ;