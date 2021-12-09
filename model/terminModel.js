

const mongoose = require("mongoose")
const { Schema } = mongoose
const termin = new Schema(
    {
        time: Number,
        date: String,
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"userPraxis"
        },
    }
)

module.exports = mongoose.model("Termin", termin)