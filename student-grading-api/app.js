const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./models/index.js'); 

// const userRouter = require('./src/routes/userRouter.js');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
// app.use('/api/user', userRouter);
// app.use('/api/course', courseRouter);

(async () => {
  try {
    await sequelize.sync();
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
    
  } catch (error) {
    console.error('Error syncing database:', error);
  }
})();
