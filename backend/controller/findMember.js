import Member from "../model/memberModel.js";

export const findMember = async (req, res) => {
    const { id } = req.params; // Destructure directly from req.params

    const find = await Member.findById({ _id: id }); // Use _id for Mongoose query
    console.log(find)
    res.json(find);
}
