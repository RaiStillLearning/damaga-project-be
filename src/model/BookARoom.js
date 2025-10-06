const mongoose = require("mongoose");

const bookARoomSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Country: {
      type: String,
      required: true,
    },
    Phone: {
      type: Number,
      required: true,
    },
    RoomType: {
      type: String,
      required: true,
    },
    ArrDate: {
      type: Date,
      default: Date.now,
    },
    DeptDate: {
      type: Date,
    },
    TypeOfGuest: {
      type: String,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
    ZipCode: {
      type: Number,
      required: true,
    },
    Fax: {
      type: String,
      required: false,
    },
    RoomRate: {
      type: Number,
      required: true,
    },
    NoOfPerson: {
      type: Number,
      required: true,
      alias: "NumberOfPerson", // Tambahkan alias jika perlu backward compatibility
    },
    ArrTime: {
      type: String,
      required: true,
    },
    DeptTime: {
      type: String,
      required: true,
    },
    Payment: {
      type: String,
      required: true,
    },
    ReservationMadeBy: {
      type: String,
      enum: ["Phone", "Direct", "Letter", "Fax"],
      default: "Direct",
    },
    Request: {
      type: String,
      required: true,
    },
    Clerk: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BookARoom = mongoose.model("BookARoom", bookARoomSchema, "book_a_room");
module.exports = BookARoom;
