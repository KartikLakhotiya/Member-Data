import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogDescription1,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";

import {
  CaretSortIcon,
  ChevronDownIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Importing libraries for Excel export
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export type Member = {
  _id: string,
  member_id: string;
  familyHead: string;
  name: string;
  phone: string;
  dob: string;
  nominee: string;
  age: number;
  relation: string;
  membership_date: string;
  address: string;
  gender: string;
  fh_name: string;
  aadhar: string;
  bankacc_no: string;
  ifsc: string;
  bank_name: string;
  bank_add: string;
  loan_guarantee: string;
  shares: number;
  status: string;
};

export const columns: ColumnDef<Member>[] = [
  // {accessorKey:"_id",header:"ID"},
  { accessorKey: "member_id", header: "Member ID" },
  { accessorKey: "familyHead", header: "Family Head" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "dob", header: "DOB" },
  { accessorKey: "nominee", header: "Nominee" },
  { accessorKey: "age", header: "Age" },
  { accessorKey: "relation", header: "Relation" },
  { accessorKey: "membership_date", header: "Membership Date" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "fh_name", header: "F/H Name" },
  { accessorKey: "aadhar", header: "Aadhar" },
  { accessorKey: "bankacc_no", header: "Bank Account No." },
  { accessorKey: "ifsc", header: "IFSC Code" },
  { accessorKey: "bank_name", header: "Bank Name" },
  { accessorKey: "bank_add", header: "Bank Address" },
  { accessorKey: "loan_guarantee", header: "Loan Guarantee" },
  { accessorKey: "shares", header: "Shares" },
  { accessorKey: "status", header: "Status" },
];

export function AllMembers() {
  const [allMembers, setAllMembers] = React.useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchAllMembers = async () => {
    toast({
      variant:'default',
      title:'Fetching Members Data.'
    })
    const response = await fetch('https://member-data-qtrd.onrender.com/api/auth/allmembers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setAllMembers(data);
    toast({
      variant:'success',
      title:'Members Data Fetched.'
    })
  };
  React.useEffect(() => {
    fetchAllMembers();
  }, []);

  const filteredMembers = React.useMemo(() => {
    return allMembers.filter((member: Member) =>
      (member.name && member.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.familyHead && member.familyHead.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (member.bank_name && member.bank_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, allMembers]);

  const table = useReactTable({
    data: filteredMembers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });


  const exportToExcel = () => {
    const selectedColumns = table.getAllColumns().filter(column => column.getIsVisible());
    const dataToExport = filteredMembers.map(member => {
      const rowData: any = {};
      selectedColumns.forEach(column => {
        let value = member[column.id as keyof Member];
        if (column.id === "bankacc_no") {
          value = `'${value}`;
        }
        rowData[column.id] = value;
      });
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "members.xlsx");
  };

  const editUser = (id: string) => {
    navigate(`/edit-member/${id}`);

  }

  const deleteMember = async (id: string) => {
    toast({
      variant: "destructive",
      title: "Deleting Member.",
    });

    try {
      const response = await fetch(`https://member-data-qtrd.onrender.com/api/auth/delete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        toast({
          variant: "destructive",
          title: "Some Error Occurred.",
        });
      }
      toast({
        variant: "success",
        title: "Member Deleted.",
      });
      fetchAllMembers();


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center py-4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="max-w-sm mb-4"
        />
        <div className="ml-auto flex space-x-2 mr-9">
          {table.getAllColumns().map((column) => (
            <div key={column.id} className="flex flex-col items-center space-x-1">
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={(event) => column.toggleVisibility(event.target.checked)}
                id={column.id}
                className=" rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500 h-5 w-5 cursor-pointer mr-5"
              />
              <label htmlFor={column.id} className="capitalize text-center">{column.id}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-md border mx-11">
        <Table className="custom-table">
          <TableHeader className="custom-table-header">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="custom-table-cell">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="custom-table-body">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="custom-table-row">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="custom-table-cell">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell className="custom-table-cell">
                    {/* Edit Section */}

                    <Button variant='link' className="text-green-500" onClick={() => editUser(row.original._id)}>Edit</Button>


                  </TableCell>
                  <TableCell className="custom-table-cell">
                    {/* Delete Button */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="link" className="text-red-500">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription1>
                            This action cannot be undone. This will permanently delete the
                            member and remove the data from our database.
                          </AlertDialogDescription1>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="text-white bg-red-600 hover:bg-red-900" onClick={() => deleteMember(row.original._id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center custom-table-cell">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>


      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total Records : {table.getFilteredRowModel().rows.length} row(s)
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <Button onClick={exportToExcel} className="ml-2">Export to Excel</Button>

      </div>
    </div>
  );
}
