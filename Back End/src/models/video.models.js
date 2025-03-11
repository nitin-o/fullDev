import { request } from "express";
import mongoose , {Schema, Types} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"
const videoSchema = new Schema(
    {
        video : {
            type : String,
            require : true,
        },
        tatle:{
            type:String,
            request : true
        },
        owner:{
            type :Schema.Types.ObjectId,
            ref : "User"
        }
    },{
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)