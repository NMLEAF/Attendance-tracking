import { GraduationCap, Hand, LayoutIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideNav = () => {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 12,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Setting",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];

  return (
    <div className="border-r shadow-md h-screen p-5">
      <div className="w-full flex justify-center">
        <Image
          src="/logo.svg"
          width={70}
          height={70}
          alt="logo"
          priority={true}
        />
      </div>

      <hr className="my-5" />

      {menuList.map((menu, index) => (
        <Link href={menu.path} key={index}>
          <h2 className="flex items-center text-md gap-3 p-4 text-slate-500 hover:bg-primary hover:text-white rounded-lg cursor-pointer my-2">
            <menu.icon />
            {menu.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default SideNav;
