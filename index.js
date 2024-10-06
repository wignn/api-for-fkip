const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

dotenv.config();

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

const timeNowInIndonesia = () => {
  const date = new Date();
  const options = { timeZone: 'Asia/Jakarta', hour12: false };
  return date.toLocaleString('id-ID', options);
};

console.log(timeNowInIndonesia());



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Route to get all users
app.get("/user/f", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Test route
app.get("/test", (req, res) => {
  res.json("test");
});

// Route to create a new user
app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Route to create a new user with different field names
app.post("/data", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

app.post("/post", async (req, res) => {
  const { userId, userName, userImage, title, description, image, type, date } = req.body;
  const timeAgo = new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta', hour12: false });

  console.log(req.body);
  try {
    const newPost = await prisma.post.create({
      data: {
        userId,
        userName,
        userImage,
        title,
        description,
        image,
        type,
        date,
        timeAgo,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Failed to create post" });
  }
});

app.get("/post", async (req, res) => {
  try {
      posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});



const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
