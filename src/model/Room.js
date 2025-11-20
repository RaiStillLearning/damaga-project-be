const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    roomType: {
      type: String,
      required: true, // DSD, DST, DDD, dll
    },
    floor: {
      type: Number,
      required: true, // 2, 3, 4, ...
    },
    status: {
      type: String,
      enum: ["VD", "VC", "VCI", "OD", "OC", "OS", "OO"],
      default: "VC",
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model("Room", roomSchema, "rooms");
module.exports = Room;
