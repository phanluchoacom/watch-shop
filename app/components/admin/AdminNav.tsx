"use client";

import Container from "@/app/components/Container";
import AdminNavItem from "@/app/components/admin/AdminNavItem";
import Link from "next/link";
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminNav = () => {
  const pathName = usePathname();
  return (
    <div className="w-full shadow-sm top-20 border-b-[1px] pt-4">
      <Container>
        <div className="flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap">
          <Link href="/admin">
            <AdminNavItem
              selected={pathName === "/admin"}
              icon={MdDashboard}
              label="Summary"
            />
          </Link>
          <Link href="/admin/add-products">
            <AdminNavItem
              selected={pathName === "/admin/add-products"}
              icon={MdLibraryAdd}
              label="Add Products"
            />
          </Link>
          <Link href="/admin/manage-products">
            <AdminNavItem
              selected={pathName === "/admin/manage-products"}
              icon={MdDns}
              label="Manage Products"
            />
          </Link>
          <Link href="/admin/manage-orders">
            <AdminNavItem
              selected={pathName === "/admin/manage-orders"}
              icon={MdFormatListBulleted}
              label="Manage Orders"
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
