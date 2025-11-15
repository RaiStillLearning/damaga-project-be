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
    NoOfRoom: {
      type: Number,
      required: true,
    },
    // ✅ Field baru yang ditambahkan
    RoomNumber: {
      type: String,
      required: false,
    },
    IDNumber: {
      type: String,
      required: false,
    },
    DateOfIssue: {
      type: Date,
      required: false,
    },
    DateOfBirth: {
      type: Date,
      required: false,
    },
    Source: {
      type: String,
      required: false,
    },
    Note: {
      type: String,
      required: false,
    },
    ArrDate: {
      type: Date,
      default: Date.now,
    },
    DeptDate: {
      type: Date,
    },
    // ✅ Ubah jadi optional dengan default value
    TypeOfGuest: {
      type: String,
      required: false,
      default: "Walk-in",
    },
    City: {
      type: String,
      required: false,
      default: "-",
    },
    ZipCode: {
      type: Number,
      required: false,
      default: 0,
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
      alias: "NumberOfPerson",
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
      required: false,
      default: "None",
    },
    Clerk: {
      type: String,
      required: true,
    },
    Discount: {
      type: Number,
      required: false,
      default: 0,
    },
    // ✅ Status check-in
    status: {
      type: String,
      enum: ["pending", "confirmed", "checked-in", "checked-out", "cancelled"],
      default: "pending",
    },
    checkInDate: {
      type: Date,
      required: false,
    },
    checkOutDate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const BookARoom = mongoose.model("BookARoom", bookARoomSchema, "book_a_room");
module.exports = BookARoom;
