const cron = require("node-cron");
const Task = require("../src/models/task");

cron.schedule('* * * * *', async () => {
    const currentDate = new Date();
    const tasks = await Task.find({});
  
    tasks.forEach(async (task) => {
      const dueDate = new Date(task.due_date);
      const differenceInDays = Math.ceil(Math.abs(dueDate - currentDate) / (1000 * 60 * 60 * 24));
  
      if (differenceInDays === 0) {
        task.priority = 0;
      } else if (differenceInDays === 1 || differenceInDays === 2) {
        task.priority = 1;
      } else if (differenceInDays === 3 || differenceInDays === 4) {
        task.priority = 2;
      } else {
        task.priority = 3;
      }
  
      await task.save();
    });
  });
  