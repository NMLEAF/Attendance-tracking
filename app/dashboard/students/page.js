"use client";

import GlobalApi from "@/app/_services/GlobalApi";
import AddNewStudent from "./_components/AddNewStudent";
import { useEffect } from "react";

const Student = () => {
  useEffect(() => {
    GetAllStudents();
  }, []);

  const GetAllStudents = () => {
    GlobalApi.GetAllStudents().then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudent />
      </h2>
    </div>
  );
};

export default Student;
