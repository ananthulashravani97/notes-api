import express from "express";

const app = express()
app.use(express.json());
let notes = [
    {
        id: 1,
        title: "First Note",
        content: "This is the first note"
    },
    {
        id: 2,
        title: "Second Note",
        content: "This is the second note"
    },
    {
        id: 3,
        title: "Third Note",
        content: "This is the third note"
    }
];
let nextId = 4;
app.get("/notes",(req,res) => {
    res.json(notes);
});
app.get("/notes/:id",(req,res)=>{
    if(isNaN(req.params.id)) return res.status(400).json({"message": "Invalid ID"});
    const note = notes.find((n)=> n.id === parseInt(req.params.id));
    if(!note) return res.status(404).json({"message": "Note not found"});
    return res.json(note);
})
app.post("/notes",(req,res)=>{
    console.log(req.body);
    const { title, content } = req.body;
    if(typeof title !== "string" || title.trim() === "") return res.status(400).json({"message": "Title is required"});
    const note = {
        id: nextId++,
        title: title.trim(),
        content: content ?? ""
    }
    notes.push(note);
    return res.status(201).json(note);
})
app.put("/notes/:id",(req,res)=>{
    if(isNaN(req.params.id)) return res.status(400).json({"message": "Invalid ID"});
    const note = notes.find((n)=> n.id === parseInt(req.params.id))
    if(!note) return res.status(404).json({"message": "Note not found"});
    const { title, content } = req.body;
    if(typeof title !== "string" || title.trim() === "") return res.status(400).json({"message": "Title is required"});
    note.title = title.trim();
    note.content = content ?? "";
console.log(notes);
    return res.json(note);
    
})
app.delete("/notes/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(req.params.id)) return res.status(400).json({"message": "Invalid ID"});
    const noteIndex = notes.findIndex((n)=> n.id === id)
    if(noteIndex === -1) return res.status(404).json({"message": "Note not found"});
    notes = notes.filter((n)=> n.id !== id);
    return res.status(204).json(notes);
})
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});