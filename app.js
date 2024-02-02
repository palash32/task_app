const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mongoose = require('mongoose');
const uri = "mongodb+srv://palashmishra2002:btuCnrtH4KBpPUW5@taskapp.pvltjlb.mongodb.net/?retryWrites=true&w=majority";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

const taskRoutes = require('./src/routes/taskRoutes');
app.use('/tasks', taskRoutes);

const subtaskRoutes = require('./src/routes/subtaskRoutes');
app.use('/subtasks',subtaskRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
