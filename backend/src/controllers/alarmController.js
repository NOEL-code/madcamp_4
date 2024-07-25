const {
  saveOneAlarm,
  deleteAlarm,
  getAlarms,
} = require("../services/alarmService.js");

exports.saveOneAlarm = async (req, res) => {
  const { userId, title, content } = req.body;

  try {
    const alarm = await saveOneAlarm(userId, title, content);
    res.status(200).json(alarm);
  } catch (err) {
    console.error("Error in createManyAlarm controller:", err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAlarm = async (req, res) => {
  const alarmId = req.params.alarmId;
  try {
    const deletedAlarm = await deleteAlarm(alarmId);
    res.status(200).json(deletedAlarm);
  } catch (err) {
    console.log("Error in deleteAlarm controller", err);
    res.status(500).json({ message: err.message });
  }
};

exports.getAlarms = async (req, res) => {
  const userId = req.params.userId;
  try {
    const alarm = await getAlarms(userId);
    res.status(200).json(alarm);
  } catch (err) {
    console.log("Error in getAlarms controller", err);
    res.status(500).json({ message: err.message });
  }
};
