const { Alarm } = required("../models/Alarm.js");

exports.saveAlarm = async (userId, type, title, content) => {
  const newAlarmData = {
    userId: userId,
    type: type,
    title: title,
    content: content,
  };
  const newAlarm = new Alarm(newAlarmData);

  return await newAlarm.save();
};

exports.deleteAlarm = async (alarmId) => {
  return await Alarm.findByIdAndDelete(alarmId);
};
