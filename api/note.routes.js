const { auth } = require("../middelware/authentication/auth");
const { validateNote } = require("../middelware/validation/note.validation");
const { addNote, allNotes, userNotes, updateNote, deleteNote, searchNote } = require("../services/note.service");

const router = require("express").Router() ;

router.post("/" ,auth,validateNote,addNote );
router.get("/" ,auth,userNotes );
router.get("/search" ,auth,validateNote,searchNote );
router.put("/" ,auth,validateNote,updateNote );
router.delete("/" ,validateNote,deleteNote );

module.exports = router;