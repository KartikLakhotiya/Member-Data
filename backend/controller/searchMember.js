import Member from "../model/memberModel.js";

export const searchMember = async (req, res) => {
    const { member_id, familyHead, name, phone, dob, nominee, age, relation, membership_date, address, gender, fh_name } = req.body
    console.log(name)
    const searchTerm = name;
    const regex = new RegExp(searchTerm, 'i');
    const member = await Member.find({ name: regex })

    // console.log(member)
    
    if (!member) {
        return res.status(400).json({ error: "Member Not Found" })

    }

    // console.log(`Member found ${member.name}`)
    res.status(201).json(member)
}