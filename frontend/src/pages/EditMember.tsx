import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate, useParams } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'

export const EditMember = () => {
    const { id } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();
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
    })
    const inputRef = useRef<any>(null);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setMemberData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const url = await uploadToCloudinary(file);
            setMemberData((prevData) => ({
                ...prevData,
                [fieldName]: url
            }));
        }
    };

    const uploadToCloudinary = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'member-data'); // Use your unsigned upload preset name

        const response = await axios.post('https://api.cloudinary.com/v1_1/dk5qxgvo4/image/upload', formData); // Replace with your Cloudinary cloud name

        return response.data.secure_url; // Return the URL of the uploaded image
    };

    const focusInput = () => {
        inputRef.current.focus();
    }

    const fetchMemberData = async () => {
        try {
            const response = await fetch(`https://member-data-qtrd.onrender.com/api/auth/find/${id}`,{
                method:'POST'
            });
            if (response.ok) {
                const member = await response.json();
                console.log(member);
                setMemberData(member);
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Failed to fetch member data.'
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                variant: 'destructive',
                title: 'An error occurred while fetching member data.'
            });
        }
    };

    const submit = async () => {
        try {
            toast({
                variant: "default",
                title: "Editing Member Data"
            })

            const response = await fetch(`https://member-data-qtrd.onrender.com/api/auth/editmember/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memberData)
            })
            if (!response.ok) {
                toast({
                    variant: 'destructive',
                    title: 'Some error occurred.'
                })
                return
            }

            console.log(response)

            const member = await response.json();
            setMemberData(member)
            toast({
                variant: 'success',
                title: 'Member Edited'
            })
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMemberData();
        focusInput();
    }, [])

    return (
        <div>
            <Card className="w-[800px] mr-auto ml-auto mt-4 mb-0 ">
                <CardHeader>
                    <CardTitle>Edit Member</CardTitle>
                    <CardDescription>Edit details of the Selected member.</CardDescription>
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
                                <Input id="family-head" placeholder="Enter Family Head" name='familyHead'value={memberData.familyHead} className="w-66" type="text" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter Name" type="text" name='name' value={memberData.name} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="phone-number">Phone Number</Label>
                                <Input id="phone-number" type="text" placeholder="Enter Phone Number" name='phone'value={memberData.phone} className="w-44" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="dob">DOB</Label>
                                <Input id="dob" placeholder="Enter DOB" type="text" name='dob' value={memberData.dob} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nominee">Nominee</Label>
                                <Input id="nominee" placeholder="Enter Nominee Name" name='nominee'value={memberData.nominee} type="text" onChange={handleChange} />
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
                                <Label htmlFor="age">Address</Label>
                                <Input id="age" type="text" placeholder="Enter Address" name='address' value={memberData.address} className="w-44" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Gender</Label>
                                <Input id="relation" placeholder="Enter Gender" type="text" name='gender' value={memberData.gender} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="membership-date">F/H Name</Label>
                                <Input id="membership-date" placeholder="Enter F/H Name" type="text" name='fh_name' value={memberData.fh_name} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="age">Aadhar</Label>
                                <Input id="age" type="text" placeholder="Enter Aadhar Number" name='aadhar' value={memberData.aadhar} className="w-44" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Bank Account Number</Label>
                                <Input id="relation" placeholder="Enter Bank Acc No." type="text" name='bankacc_no' value={memberData.bankacc_no} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="membership-date">IFSC Code</Label>
                                <Input id="membership-date" placeholder="Enter F/H Name" type="text" name='ifsc'value={memberData.ifsc} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-24 w-72">
                                <Label htmlFor="age">Bank Name</Label>
                                <Input id="age" type="text" placeholder="Enter Bank Name" name='bank_name' className="w-72"value={memberData.bank_name} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Bank Address</Label>
                                <Input id="relation" placeholder="Enter Bank Address" type="text" name='bank_add' value={memberData.bank_add} className="w-72" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="age">Loan Guarantee</Label>
                                <Input id="age" type="text" placeholder="Enter Loan Guarantee" name='loan_guarantee' value={memberData.loan_guarantee} className="w-56" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Shares</Label>
                                <Input id="relation" placeholder="Enter No. of Shares" type="text" name='shares' value={memberData.shares} onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="membership-date">Status</Label>
                                <Input id="membership-date" placeholder="Enter Status" type="text" name='status' value={memberData.status} onChange={handleChange} />
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

                        <Button className="mt-4 w-[20rem] items-center justify-center mr-auto ml-auto" type="submit" onClick={submit} >Submit</Button>
                    </div>


                </CardContent>
            </Card>
        </div>
    )
}
