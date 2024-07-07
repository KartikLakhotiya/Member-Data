import Member from "../model/memberModel.js"

export const allMembers = async (req, res) => {
    try {

        const allMembers = await Member.find()
        res.status(200).json(allMembers)

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}