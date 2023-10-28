import React from "react";
import ClientOnly from "../ClientOnly";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  let segmentContent: {
    h2: string;
    links: {
      label: string;
      link: string;
    }[];
  }[] = [
    {
      h2: "Pierwsze kroki",
      links: [
        { label: "Załóż firmę", link: "zaloz" },
        { label: "Dołącz do istniejącej", link: "dolacz" },
      ],
    },
    {
      h2: "Statystyki",
      links: [
        { label: "Lista najlepszych kierowców", link: "topk" },
      ],
    },
    {
      h2: "O Mnie",
      links: [{ label: "Zarządzaj profilem", link: "/profil" }],
    },
  ];

  let segments = segmentContent.map((seg, ind) => {
    return (
      <div key={ind} className="space-y-2">
        <h2 className="text-sm font-semibold uppercase dark:text-gray-400">
          {seg.h2}
        </h2>
        <div className="flex flex-col space-y-1">
          {seg.links.map((link, index) => {
            return (
              <React.Fragment key={index}>
                <SidebarItem label={link.label} yerl={link.link} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <aside className="dark:bg-gray-900 dark:text-gray-100 menu p-4 pt-28 w-80 min-h-full bg-base-200 text-base-content ">
          <ClientOnly>
            <nav className="space-y-8 text-sm">{segments}</nav>
          </ClientOnly>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
