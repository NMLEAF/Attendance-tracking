"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import GlobalApi from "@/app/_services/GlobalApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const AddNewStudent = () => {
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    setIsLoading(true);
    GlobalApi.CreateNewStudent(data).then((res) => {
      console.log("--", res);
      if (res.data) {
        reset();
        toast("New student added");
      } else {
        toast("Failed to create a student");
      }
      setIsLoading(false);
    });
  }
  const selectedGrade = watch("grade");

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((res) => {
      setGrades(res.data);
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>+ Add new student</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new student</DialogTitle>
            {/* Dialog Description for accessibility */}
            <DialogDescription>
              Fill in the details below to add a new student.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullName" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Wick"
                  className="col-span-3"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-red-500">Name is required.</p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="grade" className="text-right">
                  Select Grade
                </Label>
                <Select
                  value={selectedGrade}
                  onValueChange={(value) => setValue("grade", value)}
                  id="grade"
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Choose grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((item, index) => (
                      <SelectItem value={item.grade} key={index}>
                        {item.grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade && (
                  <p className="text-red-500">Grade is required.</p>
                )}
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  type="number"
                  placeholder="98312341"
                  className="col-span-3"
                  {...register("phone")}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="Your address"
                  className="col-span-3"
                  {...register("address")}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <LoaderIcon className="animate-spin" /> : "Save"}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudent;
