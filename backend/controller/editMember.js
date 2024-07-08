import Member from "../model/memberModel.js"

export const editMember = async (req, res) => {
    let { member_id, familyHead, name, phone, dob, nominee, age, relation, membership_date, address, gender, fh_name, aadhar, bankacc_no, ifsc, bank_name, bank_add, loan_guarantee, shares, status, profileImage, signature } = req.body

    try {
        const member = await Member.findById(req.params.id);

        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        // Use existing values if the new ones are not provided (falsy values)
        member.member_id = member_id || member.member_id;
        member.familyHead = familyHead || member.familyHead;
        member.name = name || member.name;
        member.phone = phone || member.phone;
        member.dob = dob || member.dob;
        member.nominee = nominee || member.nominee;
        member.age = age || member.age;
        member.relation = relation || member.relation;
        member.membership_date = membership_date || member.membership_date;
        member.address = address || member.address;
        member.gender = gender || member.gender;
        member.fh_name = fh_name || member.fh_name;
        member.aadhar = aadhar || member.aadhar;
        member.bankacc_no = bankacc_no || member.bankacc_no;
        member.ifsc = ifsc || member.ifsc;
        member.bank_name = bank_name || member.bank_name;
        member.bank_add = bank_add || member.bank_add;
        member.loan_guarantee = loan_guarantee || member.loan_guarantee;
        member.shares = shares || member.shares;
        member.status = status || member.status;
        member.profileImage = profileImage || member.profileImage;
        member.signature = signature || member.signature;



        await member.save();
        console.log(`Member Edited ${member.name}`);
        res.json(member);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
