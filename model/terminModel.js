

const mongoose = require("mongoose")
const { schema } = mongoose
const termin = new schema(
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