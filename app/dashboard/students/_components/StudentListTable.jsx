import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useState } from "react";
import { Search, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const StudentListTable = ({ studentLists, refreshData }) => {
  const [rowData, setRowData] = useState([]);

  const CustomButton = (props) => {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <TrashIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteStudent(props.data.id)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true },
    { field: "name", filter: true },
    { field: "address", filter: true },
    { field: "phone", filter: true },
    { field: "action", cellRenderer: CustomButton },
  ]);
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    studentLists && setRowData(studentLists);
  }, [studentLists]);

  const deleteStudent = (id) => {
    GlobalApi.DeleteStudent(id).then((res) => {
      if (res) {
        toast("Student successfully deleted!");
        refreshData();
      }
    });
  };

  return (
    <div className="my-7">
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        <div className="rounded-lg p-2 shadow-sm border flex gap-2 mb-2 max-w-sm">
          <Search />
          <input
            type="text"
            placeholder="Search on anything..."
            className="w-full outline-none bg-transparent"
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          quickFilterText={searchInput}
        />
      </div>
    </div>
  );
};

export default StudentListTable;
