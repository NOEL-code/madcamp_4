var express = require("express");
var router = express.Router();
const {
  saveOneAlarm,
  deleteAlarm,
  getAlarms,
} = require("../controllers/alarmController");

router.post("/", saveOneAlarm);
router.delete("/:alarmId", deleteAlarm);
router.get("/user/:userId", getAlarms);

module.exports = router;
