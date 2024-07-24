const Alarm = require("../models/Alarm");

exports.saveOneAlarm = async (userId, title, content) => {
  const newAlarmData = {
    userId: userId,
    title: title,
    content: content,
  };
  const newAlarm = new Alarm(newAlarmData);

  return await newAlarm.save();
};

exports.deleteAlarm = async (alarmId) => {
  return await Alarm.findByIdAndDelete(alarmId);
};

exports.getAlarms = async (userId) => {
  return await Alarm.find({ userId });
};
