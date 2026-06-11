const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const problemRoutes = require("./routes/problemRoutes")

require("dotenv").config();

const app = express();
const mockInterviewRoutes =
  require(
    "./routes/mockInterviewRoutes"
  )
const studyPlanRoutes =
require("./routes/studyPlanRoutes")

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"))
app.use("/api/ai", require("./routes/aiRoutes"))
app.use("/api/chat", require("./routes/chatRoutes"))
app.use(
  "/api/dsa",
  require("./routes/dsaRoutes")
);
app.use(
  "/api/mock",
  mockInterviewRoutes
)
app.use(
  "/api/problems",
  problemRoutes
)
app.use(
  "/api/study-plan",
  studyPlanRoutes
)
const dsaAnalyticsRoutes =
require(
 "./routes/dsaAnalyticsRoutes"
)
app.use(
 "/api/dsa-analytics",
 dsaAnalyticsRoutes
)
const PORT = process.env.PORT || 5000;

// DB connect
mongoose.connect(process.env.MONGO_URI)

.then(() => {

    console.log("MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });

})

.catch(err => console.log(err));