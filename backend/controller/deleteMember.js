import Member from "../model/memberModel.js";

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    try {

        await Member.findByIdAndDelete(id);
        res.status(200).json({ message: 'User Deleted Successfully.' })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}