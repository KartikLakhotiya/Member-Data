import express from 'express';
import { addMember } from '../controller/addMember.js';
import { searchMember } from '../controller/searchMember.js';
import { editMember } from '../controller/editMember.js';
import { allMembers } from '../controller/allMembers.js';
import { deleteMember } from '../controller/deleteMember.js';
const router = express.Router();

router.post('/addmember', addMember)
router.post('/searchmember', searchMember)
router.post('/allmembers', allMembers)
router.post('/editmember/:id', editMember)
router.delete('/delete/:id', deleteMember)


export default router