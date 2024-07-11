import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Member } from "@/types/types";

export function FetchMember() {
    const [name, setName] = useState("");
    const [fetchedMember, setMember] = useState<any>([]);

    const inputRef = useRef<any>(null);

    const focusInput = () => {
        inputRef.current.focus();
    }

    const { toast } = useToast();

    const submit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();

        toast({
            variant: "default",
            title: "Fetching Member Data.",
        });



        const data = {
            name: name,
        };





        const response = await fetch(
            "https://member-data-2mt2.onrender.com/api/auth/searchmember",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        // Validations



        if (response.ok) {
            toast({
                variant: "success",
                title: "Member Found",
            });
        } else {
            toast({
                variant: "destructive",
                title: "No Member found."
            });
            return
        }
        const fetchMember = response.json();
        fetchMember
            .then((obj) => {
                console.log(obj)
                setMember(obj);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        focusInput();
    }, [])


    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
        >
            <div className="sm:flex sm:mx-0 flex-col lg:mx-48">
                <Card className="w-[430px] mr-auto ml-auto mt-8">
                    <CardHeader>
                        <CardTitle>Search Member</CardTitle>
                        <CardDescription>
                            Fetch details of a member from the Database.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input

                                        placeholder="Enter Name"
                                        onChange={(e) => setName(e.target.value)}
                                        ref={inputRef}
                                    />
                                </div>
                                <Button type="submit">Submit</Button>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center"></CardFooter>
                </Card>

                {
                    fetchedMember.map((member: Member, index: number) => {
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 2 }}
                            >
                                <Card className="mt-5 mb-5" key={index}>
                                    <CardHeader>
                                        <CardTitle>Member Found</CardTitle>
                                        <CardDescription>
                                            Fetched details of member from the Database.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className=" w-full items-center flex">
                                            <div className="flex flex-col mr-11">
                                                <img src={member.profileImage} height={200} width={200} alt="Profile Image" className="border border-solid border-gray-800 mb-2" />
                                                <img src={member.signature} height={200} width={200} alt="Signature" className="border border-solid border-gray-800" />
                                            </div>
                                            <div className="flex space-y-1.5">
                                                <div className="flex flex-col mr-11">
                                                    <Label htmlFor="name" className="text-lg">
                                                        Member ID : {member.member_id}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Membership Date : {member.membership_date}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg font-bold">
                                                        Family Head : {member.familyHead}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Name : {member.name}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        F/H Name : {member.fh_name}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        DOB : {member.dob}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Gender : {member.gender}
                                                    </Label>

                                                    <Label htmlFor="name" className="text-lg">
                                                        Nominee : {member.nominee}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Nominee Age : {member.age}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Relation : {member.relation}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Address : {member.address}
                                                    </Label>
                                                </div>
                                                <div className="flex flex-col">
                                                    <Label htmlFor="name" className="text-lg">
                                                        Phone : {member.phone}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Aadhar : {member.aadhar}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Bank Account No : {member.bankacc_no}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        IFSC Code : {member.ifsc}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Bank Name : {member.bank_name}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Bank Address : {member.bank_add}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Loan Guarantee : {member.loan_guarantee}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Shares : {member.shares}
                                                    </Label>
                                                    <Label htmlFor="name" className="text-lg">
                                                        Status : {member.status}
                                                    </Label>
                                                </div>


                                            </div>

                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )
                    })
                }
            </div>
        </motion.div>
    );
}
