import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import axios from 'axios';

export function AddMember() {
    const inputRef = useRef(null);
    const [ifsc, setIfsc] = useState(false);
    const [memberData, setMemberData] = useState({
        member_id: 0,
        familyHead: '',
        name: '',
        phone: '',
        dob: '',
        nominee: '',
        age: '',
        relation: '',
        membership_date: '',
        address: '',
        gender: '',
        fh_name: '',
        aadhar: '',
        bankacc_no: '',
        ifsc: '',
        bank_name: '',
        bank_add: '',
        loan_guarantee: '',
        shares: 0,
        status: '',
        profileImage: '',
        signature: ''
    });

    interface FileType {
        [key: string]: File | null;
    }

    const [files, setFiles] = useState<FileType>({ profileImage: null, signature: null });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, fileType: string) => {
        if (e.target.files) {
            setFiles({ ...files, [fileType]: e.target.files[0] });
        }
    };

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setMemberData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const { toast } = useToast();

    const uploadToCloudinary = async (file: string | Blob) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'member-data'); // Replace with your Cloudinary upload preset

        const response = await axios.post('https://api.cloudinary.com/v1_1/dk5qxgvo4/image/upload', formData); // Replace with your Cloudinary cloud name

        return response.data.secure_url; // Return the URL of the uploaded image
    };

    const submit = async () => {

        const ifsc_code = /^[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/.test(memberData.ifsc)
        console.log(ifsc_code)
        if (!ifsc_code) {
            setIfsc(true);
            toast({
                variant: "destructive",
                title: "Invalid IFSC Code."
            })
            return
        }
        toast({
            variant: "default",
            title: "Adding Member Data.",
        });

        try {
            const profileImageUrl = files.profileImage ? await uploadToCloudinary(files.profileImage) : '';
            const signatureUrl = files.signature ? await uploadToCloudinary(files.signature) : '';

            const memberDataWithFiles = {
                ...memberData,
                profileImage: profileImageUrl,
                signature: signatureUrl
            };

            console.log('Member Data with Files:', memberDataWithFiles);

            const response = await fetch('https://member-data-2mt2.onrender.com/api/auth/addmember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(memberDataWithFiles)
            });

            if (response.ok) {
                toast({
                    variant: "success",
                    title: "Member Added.",
                });
            } else {
                const errorData = await response.json();
                console.error('Error response from backend:', errorData);
                toast({
                    variant: "destructive",
                    title: 'Some error occurred.',
                });
            }
        } catch (error) {
            console.error('Error during file upload:', error);
            toast({
                variant: "destructive",
                title: 'File upload failed.',
            });
        }
        setMemberData({
            member_id: 0,
            familyHead: '',
            name: '',
            phone: '',
            dob: '',
            nominee: '',
            age: '',
            relation: '',
            membership_date: '',
            address: '',
            gender: '',
            fh_name: '',
            aadhar: '',
            bankacc_no: '',
            ifsc: '',
            bank_name: '',
            bank_add: '',
            loan_guarantee: '',
            shares: 0,
            status: '',
            profileImage: '',
            signature: ''
        })
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <div className="addmember w-[900px] items-center mr-auto ml-auto p-4 mt-4 mb-4">
                <Card className="w-[800px] mr-auto ml-auto mt-4 mb-0">
                    <CardHeader>
                        <CardTitle>Add Member</CardTitle>
                        <CardDescription>Add a new member to the Database.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex">
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="member-id">Member ID</Label>
                                    <Input id="member-id" type="text" ref={inputRef} name='member_id' value={memberData.member_id} className="w-44" placeholder="Enter Member ID" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="family-head">Family Head</Label>
                                    <Input id="family-head" placeholder="Enter Family Head" name='familyHead' value={memberData.familyHead} className="w-66" type="text" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Enter Name" type="text" name='name' value={memberData.name} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="flex mt-4">
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="phone-number">Phone Number</Label>
                                    <Input id="phone-number" type="text" placeholder="Enter Phone Number" value={memberData.phone} name='phone' className="w-44" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="dob">DOB</Label>
                                    <Input id="dob" placeholder="Enter DOB" type="text" name='dob' value={memberData.dob} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="nominee">Nominee</Label>
                                    <Input id="nominee" placeholder="Enter Nominee Name" name='nominee' value={memberData.nominee} type="text" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="flex mt-4">
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="age">Age</Label>
                                    <Input id="age" type="text" placeholder="Enter Age" name='age' value={memberData.age} className="w-44" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="relation">Relation</Label>
                                    <Input id="relation" placeholder="Enter Relation" name='relation' value={memberData.relation} type="text" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="membership-date">Membership Date</Label>
                                    <Input id="membership-date" placeholder="Enter Membership Date" name='membership_date' value={memberData.membership_date} type="text" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="flex mt-4">
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="address">Address</Label>
                                    <Input id="address" type="text" placeholder="Enter Address" name='address' value={memberData.address} className="w-44" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="gender">Gender</Label>
                                    <Input id="gender" placeholder="Enter Gender" type="text" name='gender' value={memberData.gender} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="fh_name">F/H Name</Label>
                                    <Input id="fh_name" placeholder="Enter F/H Name" type="text" name='fh_name' value={memberData.fh_name} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="flex mt-4">
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="aadhar">Aadhar</Label>
                                    <Input id="aadhar" type="text" placeholder="Enter Aadhar Number" name='aadhar' value={memberData.aadhar} className="w-44" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="bankacc_no">Bank Account Number</Label>
                                    <Input id="bankacc_no" placeholder="Enter Bank Acc No." type="text" value={memberData.bankacc_no} name='bankacc_no' onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="ifsc">IFSC Code</Label>
                                    <Input id="ifsc" placeholder="Enter IFSC Code" type="text" name='ifsc' value={memberData.ifsc} onChange={handleChange} />
                                    {ifsc && <p className="text-sm text-red-500 ml-2">Invalid IFSC Code.</p>}
                                </div>
                            </div>

                            <div className="flex mt-4">
                                <div className="flex flex-col space-y-1.5 mr-24 w-72">
                                    <Label htmlFor="bank_name">Bank Name</Label>
                                    <Input id="bank_name" type="text" placeholder="Enter Bank Name" name='bank_name' value={memberData.bank_name} className="w-72" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="bank_add">Bank Address</Label>
                                    <Input id="bank_add" placeholder="Enter Bank Address" type="text" name='bank_add' value={memberData.bank_add} className="w-72" onChange={handleChange} />
                                </div>
                            </div>

                            <div className="flex mt-4">
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="loan_guarantee">Loan Guarantee</Label>
                                    <Input id="loan_guarantee" type="text" placeholder="Enter Loan Guarantee" name='loan_guarantee' value={memberData.loan_guarantee} className="w-56" onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="shares">Shares</Label>
                                    <Input id="shares" placeholder="Enter No. of Shares" type="text" name='shares' value={memberData.shares} onChange={handleChange} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="status">Status</Label>
                                    <Input id="status" placeholder="Enter Status" type="text" name='status' value={memberData.status} onChange={handleChange} />
                                </div>
                            </div>
                            <div className="flex mt-4">
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="profile-image">Profile Image</Label>
                                    <Input id="profile-image" name='profileImage' type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'profileImage')} />
                                </div>
                                <div className="flex flex-col space-y-1.5 mr-11">
                                    <Label htmlFor="signature">Signature</Label>
                                    <Input id="signature" type="file" name="signature" accept="image/*" onChange={(e) => handleFileChange(e, 'signature')} />
                                </div>
                            </div>

                            <Button className="mt-4 w-[20rem] items-center justify-center mr-auto ml-auto" type="submit" onClick={submit}>Submit</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    );
}
