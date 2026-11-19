import {Router} from 'express';
const router = Router();

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
router.get("/",(req,res) => {
    res.json(notes);
});
router.get("/boom",(req,res)=>{
    throw new Error("Boom!");
})
router.get("/:id",(req,res)=>{
    if(isNaN(req.params.id)) return res.status(400).json({"message": "Invalid ID"});
    const note = notes.find((n)=> n.id === parseInt(req.params.id));
    if(!note) return res.status(404).json({"message": "Note not found"});
    return res.json(note);
})
router.post("/",(req,res)=>{
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
router.put("/:id",(req,res)=>{
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
router.delete("/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    if(isNaN(req.params.id)) return res.status(400).json({"message": "Invalid ID"});
    const noteIndex = notes.findIndex((n)=> n.id === id)
    if(noteIndex === -1) return res.status(404).json({"message": "Note not found"});
    notes = notes.filter((n)=> n.id !== id);
    return res.status(204).json(notes);
})

export default router;