const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
require("dotenv").config();
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

const database = require("./config/database");
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");

const PORT = process.env.PORT || 4000;

database.dbConnect();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is Up and running",
  });
});

app.listen(PORT, () => {
  console.log(`Server of HarvardNation is up at PORT ${PORT}`);
});
