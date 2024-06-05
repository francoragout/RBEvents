"use client";

import React from "react";
import Header from "./header";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "@radix-ui/react-icons";

export const Navbar = () => {
  const paths = usePathname();
  const pathNames = paths.startsWith("/")
    ? paths.split("/").filter((path) => path)
    : [];

  return (
    <React.Fragment>
      <Header />
      <Breadcrumb>
        <BreadcrumbList>
          {pathNames.length > 0 && (
            <>
              <BreadcrumbItem>
                <HomeIcon />
              </BreadcrumbItem>
              {pathNames.map((path, index) => {
                const href = "/" + pathNames.slice(0, index + 1).join("/");
                const isLast = index === pathNames.length - 1;
                return (
                  <React.Fragment key={href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{path}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={href}>{path}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })}
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </React.Fragment>
  );
};
