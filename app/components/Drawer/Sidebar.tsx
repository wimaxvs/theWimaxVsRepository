import React from "react";
import ClientOnly from "../ClientOnly";
import SidebarItem from "./SidebarItem";

interface SideBarAttributes {
  role?: string;
  firmName?: string | null;
}

const Sidebar: React.FC<SideBarAttributes> = ({ role, firmName }) => {
  let isInside = firmName?.toLowerCase() === "wimax";
  let isZarzad = role === "ZARZAD";

  let segmentContent: {
    h2?: string;
    links: {
      label: string;
      link: string;
      access?: { payGrade?: string; isInstated?: boolean };
      color?: string;
    }[];
  }[] = [
    {
      h2: "Pierwsze krok",
      links: [
        // { label: "Załóż firmę", link: "zaloz" },
        { label: "Wyślij prośbę o dołączenie", link: "dolacz" },
      ],
    },
    {
      h2: "Statystyki firmy",
      links: [{ label: "Kierowcy w Wimax", link: "topk" }],
    },
    {
      h2: "O Mnie",
      links: [{ label: "Zarządzaj profilem", link: "profil" }],
    },
  ];

  let insiderSegmentContent: typeof segmentContent = [
    {
      h2: "Pojazdy i przyczepy",
      links: [
        {
          label: "Pojazd",
          link: "pojazd",
          color: "#1fb2a6",
        },
        {
          label: "Naczepy i przyczepy",
          link: "naczepy",
          color: "#1fb2a6",
        },
      ],
    },
    {
      h2: "Rozpiski",
      links: [
        {
          label: "Trasy do ukończenia",
          link: "rozpiski",
          color: "#1fb2a6",
        },
      ],
    },
    {
      h2: "Rozliczenia",
      links: [
        {
          label: "Rozlicz wykonaną trasę",
          link: "rozliczenia",
          color: "#1fb2a6",
        },
      ],
    },
  ];

  let zarzadClearanceContent: typeof segmentContent = [
    {
      h2: "Pracownicy",
      links: [
        {
          label: "Utwórz nowy profil pracownika",
          link: "dodaj",
          color: "#1fb2a6",
        },
        {
          label: "Zatrudnij lub zwolnij pracownika",
          link: "pracownicy",
          color: "#1fb2a6",
        },
      ],
    },
  ];

  if (isInside) {
    segmentContent.shift();
    segmentContent.unshift(...insiderSegmentContent);
    if (isZarzad) {
      segmentContent.splice(-2, 0, ...zarzadClearanceContent);
    }
  }

  let segments = segmentContent.map((seg, ind) => {
    return (
      <div key={ind} className="space-y-2">
        {seg.h2 && (
          <h2 className="text-sm font-semibold uppercase dark:text-gray-400">
            {seg.h2}
          </h2>
        )}
        <div className="flex flex-col space-y-1">
          {seg.links.map((link, index) => {
            return (
              <React.Fragment key={index}>
                <SidebarItem
                  label={link.label}
                  yerl={link.link}
                  color={link.color}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="drawer-side z-20">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <aside className="dark:bg-gray-900 dark:text-gray-100 menu p-4 pt-28 w-80 min-h-full bg-base-200 text-base-content ">
          <ClientOnly>
            <SidebarItem isPulpit label={"Pulpit"} yerl={"pulpit"} />

            <nav className="space-y-8 text-sm">{segments}</nav>
          </ClientOnly>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
