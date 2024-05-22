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

export const Navbar = () => {
  const paths = usePathname();
  const pathNames = paths.startsWith("/admin")
    ? paths.split("/").filter((path) => path)
    : [];

  return (
    <React.Fragment>
      <Header />
      <Breadcrumb className="mb-7">
        <BreadcrumbList>
          {pathNames.length > 0 && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              {pathNames.slice(1).map((path, index) => {
                const href = "/" + pathNames.slice(0, index + 1).join("/");
                const isLast = index === pathNames.slice(1).length - 1;

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
