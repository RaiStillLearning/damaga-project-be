const express = require("express");
const router = express.Router();
const Room = require("../model/Room");

// GET /api/rooms -> ambil semua room dan statusnya
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ floor: 1, roomNumber: 1 });
    res.json({ rooms });
  } catch (err) {
    console.error("Error fetching rooms:", err);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// PUT /api/rooms/:roomNumber -> update status room
router.put("/:roomNumber", async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const room = await Room.findOneAndUpdate(
      { roomNumber },
      { status },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json(room);
  } catch (err) {
    console.error("Error updating room:", err);
    res.status(500).json({ message: "Failed to update room" });
  }
});

module.exports = router;
