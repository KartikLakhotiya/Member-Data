import { Long } from "mongodb";
import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    member_id: {
        type: Number,
    },
    familyHead: {
        type: String,

    },
    name: {
        type: String,

    },
    phone: {
        type: String,

    },
    dob: {
        type: String,
    },
    nominee: {
        type: String,
    },
    age: {
        type: String,
    },
    relation: {
        type: String,
    },
    membership_date: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    fh_name: {
        type: String,
    },
    aadhar: {
        type: String
    },
    bankacc_no: {
        type: String
    },
    ifsc: {
        type: String
    },
    bank_name: {
        type: String
    },
    bank_add: {
        type: String
    },
    loan_guarantee: {
        type: String
    },
    shares: {
        type: Number
    },
    status: {
        type: String
    }
}, { timestamps: true })

const Member = mongoose.model('member', memberSchema)

export default Member;