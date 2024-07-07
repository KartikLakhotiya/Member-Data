import Member from "../model/memberModel.js"

export const addMember = async (req, res) => {

    try {

        const { member_id, familyHead, name, phone, dob, nominee, age, relation, membership_date, address, gender, fh_name, aadhar, bankacc_no, ifsc, bank_name, bank_add, loan_guarantee, shares, status } = req.body

        const newMember = new Member({
            member_id,
            familyHead,
            name,
            phone,
            dob,
            nominee,
            age,
            relation,
            membership_date,
            address,
            gender,
            fh_name,
            aadhar,
            bankacc_no, ifsc,
            bank_name,
            bank_add,
            loan_guarantee,
            shares,
            status
        })

        if (newMember) {
            await newMember.save();
            console.log(`Member created ${newMember.name}`);
            res.status(201).json({
                _id: newMember._id,
                member_id: newMember.member_id,
                familyHead: newMember.familyHead,
                name: newMember.name,
                phone: newMember.phone,
                dob: newMember.dob,
                nominee: newMember.nominee,
                age: newMember.age,
                relation: newMember.relation,
                membership_date: newMember.membership_date,
                address: newMember.address,
                gender: newMember.gender,
                fh_name: newMember.fh_name,
                aadhar: newMember.aadhar,
                bankacc_no: newMember.bankacc_no,
                ifsc: newMember.ifsc,
                bank_name: newMember.bank_name,
                bank_add: newMember.bank_add,
                loan_guarantee: newMember.loan_guarantee,
                shares: newMember.shares,
                status: newMember.status

            })

        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }

}