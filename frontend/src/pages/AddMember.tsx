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
import { useToast } from "@/components/ui/use-toast"
import { motion } from "framer-motion";


export function AddMember() {
    const inputRef = useRef<any>(null);

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
        status: ''
    })

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;
        setMemberData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const focusInput = () => {
        inputRef.current.focus();
    }


    const { toast } = useToast()


    const submit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        toast({
            variant: "default",
            title: "Adding Member Data.",
        })
        const response = await fetch('https://member-data-qtrd.onrender.com/api/auth/addmember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(memberData)
        })
        if (response.ok) {
            toast({
                variant: "success",
                title: "Member Added.",
            })
        }
        else {
            toast({
                variant: "destructive",
                title: 'Some error occured.'
            })
            return
        }
        console.log(memberData)

    }
    useEffect(() => {
        focusInput();
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <Card className="w-[800px] mr-auto ml-auto mt-4 mb-0 ">
                <CardHeader>
                    <CardTitle>Add Member</CardTitle>
                    <CardDescription>Add a new member to the Database.</CardDescription>
                </CardHeader>
                <CardContent>

                    <div className="grid w-full items-center gap-4">
                        <div className="flex">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="member-id">Member ID</Label>
                                <Input id="member-id" type="text" ref={inputRef} name='member_id' className="w-44" placeholder="Enter Member ID" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="family-head">Family Head</Label>
                                <Input id="family-head" placeholder="Enter Family Head" name='familyHead' className="w-66" type="text" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Enter Name" type="text" name='name' onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="phone-number">Phone Number</Label>
                                <Input id="phone-number" type="text" placeholder="Enter Phone Number" name='phone' className="w-44" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="dob">DOB</Label>
                                <Input id="dob" placeholder="Enter DOB" type="text" name='dob' onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="nominee">Nominee</Label>
                                <Input id="nominee" placeholder="Enter Nominee Name" name='nominee' type="text" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="age">Age</Label>
                                <Input id="age" type="text" placeholder="Enter Age" name='age' className="w-44" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Relation</Label>
                                <Input id="relation" placeholder="Enter Relation" name='relation' type="text" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="membership-date">Membership Date</Label>
                                <Input id="membership-date" placeholder="Enter Membership Date" name='membership_date' type="text" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="age">Address</Label>
                                <Input id="age" type="text" placeholder="Enter Address" name='address' className="w-44" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Gender</Label>
                                <Input id="relation" placeholder="Enter Gender" type="text" name='gender' onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="membership-date">F/H Name</Label>
                                <Input id="membership-date" placeholder="Enter F/H Name" type="text" name='fh_name' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="age">Aadhar</Label>
                                <Input id="age" type="text" placeholder="Enter Aadhar Number" name='aadhar' className="w-44" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Bank Account Number</Label>
                                <Input id="relation" placeholder="Enter Bank Acc No." type="text" name='bankacc_no' onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="membership-date">IFSC Code</Label>
                                <Input id="membership-date" placeholder="Enter F/H Name" type="text" name='ifsc' onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-24 w-72">
                                <Label htmlFor="age">Bank Name</Label>
                                <Input id="age" type="text" placeholder="Enter Bank Name" name='bank_name' className="w-72" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Bank Address</Label>
                                <Input id="relation" placeholder="Enter Bank Address" type="text" name='bank_add' className="w-72" onChange={handleChange} />
                            </div>
                        </div>
                        <div className="flex mt-4">
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="age">Loan Guarantee</Label>
                                <Input id="age" type="text" placeholder="Enter Loan Guarantee" name='loan_guarantee' className="w-56" onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5 mr-11">
                                <Label htmlFor="relation">Shares</Label>
                                <Input id="relation" placeholder="Enter No. of Shares" type="text" name='shares' onChange={handleChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="membership-date">Status</Label>
                                <Input id="membership-date" placeholder="Enter Status" type="text" name='status' onChange={handleChange} />
                            </div>
                        </div>

                        <Button className="mt-4 w-[20rem] items-center justify-center mr-auto ml-auto" type="submit" onClick={submit}>Submit</Button>
                    </div>


                </CardContent>
            </Card>
        </motion.div>
    )
}
