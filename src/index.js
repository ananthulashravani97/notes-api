import express from "express";
import notesRouter from "./routes/notes.js";
const app = express()
app.use(express.json());
app.use("/notes", notesRouter);
app.get("/",(req,res)=>{
    res.json({"message": "Welcome to the Notes API"});
})
app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).json({"message": "Internal Server Error"});
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});