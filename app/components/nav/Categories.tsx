"use client";

import Container from "@/app/components/Container";
import { categories } from "@/utils/Categories";
import Category from "@/app/components/nav/Category";
import { usePathname, useSearchParams } from "next/navigation";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  const pathName = usePathname();
  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
