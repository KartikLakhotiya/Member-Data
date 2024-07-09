import Member from "../model/memberModel.js";

export const searchMember = async (req, res) => {
    const { member_id, familyHead, name, phone, dob, nominee, age, relation, membership_date, address, gender, fh_name } = req.body
    const searchTerm = name;
    const regex = new RegExp(searchTerm, 'i');
    const member = await Member.find({ name: regex })

    if (member.length === 0) {
        return res.status(400).json({ error: "Member Not Found" })
    }
    // console.log(member)

    if (!member) {
        return res.status(400).json({ error: "Member Not Found" })

    }

    res.status(201).json(member)
}