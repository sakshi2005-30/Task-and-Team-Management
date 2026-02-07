require("dotenv").config();
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const cors=require("cors");
const connectToDB=require("./config/db");
const userRoutes=require("./routes/userRoutes")
const TeamRoutes=require("./routes/createTeamRoutes")
const ProjectRoutes=require("./routes/createProjectRoutes");
const TaskRoutes=require("./routes/createTaskRoutes")
const errorHandler=require("./middleware/errorMiddleware")
connectToDB();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//     origin:"http://localhpst:3000",
//     credentials:true
// }))
app.use("/api/auth",userRoutes)
app.use("/api/team",TeamRoutes)
app.use("/api/team",ProjectRoutes)
app.use("/api/team",TaskRoutes)

app.use(errorHandler)
const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})