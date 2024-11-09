import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.router';
import documentRouter from './routes/document.router';
import commentRouter from './routes/comment.router';


dotenv.config();

const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.use("/users", userRouter)
app.use("/documents", documentRouter)
app.use("/comments", commentRouter)

// A basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});


// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
