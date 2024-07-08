export interface Member {
    _id: string,
    member_id: string,
    familyHead: string,
    name: string,
    phone: string,
    dob: string,
    nominee: string,
    age: string,
    relation: string,
    membership_date: string,
    address: string,
    gender: string,
    fh_name: string,
    aadhar: string,
    bankacc_no: string,
    ifsc: string,
    bank_name: string,
    bank_add: string,
    loan_guarantee: String,
    shares: number,
    status: string,
    profileImage: string,
    signature: string
}

export interface FileType {
    [key: string]: File | null;
}