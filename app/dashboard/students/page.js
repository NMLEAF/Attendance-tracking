"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import AddNewStudent from "./_components/AddNewStudent";
import { useEffect, useState } from "react";
import StudentListTable from "./_components/StudentListTable";

const Student = () => {
  const [studentLists, setStudentLists] = useState([]);

  useEffect(() => {
    GetAllStudents();
  }, []);

  const GetAllStudents = () => {
    GlobalApi.GetAllStudents().then((res) => {
      setStudentLists(res.data);
    });
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudent />
      </h2>

      <StudentListTable
        studentLists={studentLists}
        refreshData={GetAllStudents}
      />
    </div>
  );
};

export default Student;
