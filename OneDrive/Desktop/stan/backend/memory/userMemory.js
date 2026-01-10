const User = require("../models/User");

async function getUser(userId) {
  let user = await User.findOne({ userId });
  if (!user) {
    user = await User.create({ userId, tone: "friendly", preferences: [], memory: [] });
  }
  return user;
}

async function updateMemory(user, message) {
  if (message.includes("I like")) {
    user.preferences.push(message);
  }
  user.memory.push(message);
  await user.save();
}

module.exports = { getUser, updateMemory };
