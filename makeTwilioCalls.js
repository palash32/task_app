const cron = require("node-cron");
const Task = require("../src/models/task");
const User = require("../src/models/user");
const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN, process.env.TWILIO_CALL_URL);

cron.schedule('* * * * *', async () => {
    const currentDate = new Date();
    const tasks = await Task.find({});
  
    const usersToCall = [];
  
    tasks.forEach(async (task) => {
      const dueDate = new Date(task.due_date);
      const differenceInDays = Math.ceil(Math.abs(dueDate - currentDate) / (1000 * 60 * 60 * 24));
  
      if (differenceInDays <= 0) {
        const user = await User.findById(task.user_id);
        usersToCall.push({ user, priority: task.priority });
      }
    });
  
    usersToCall.sort((a, b) => a.priority - b.priority);
  
    for (const userToCall of usersToCall) {
      const { phone_number } = userToCall.user;
  
      try {
        await twilioClient.calls.create({
          url: TWILIO_CALL_URL,
          to: phone_number,
          from: TWILIO_PHONE_NUMBER,
        });
  
        break;
      } catch (error) {
        console.error('Failed to call user:', error);
      }
    }
  });
  