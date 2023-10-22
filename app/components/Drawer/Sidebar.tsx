import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <aside className="dark:bg-gray-900 dark:text-gray-100 menu p-4 pt-24 w-80 min-h-full bg-base-200 text-base-content ">
          <nav className="space-y-8 text-sm">
            <div className="space-y-2">
              <h2 className="text-sm font-semibold tracki uppercase dark:text-gray-400">
                Pierwsze kroki
              </h2>
              <div className="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#">
                  Załóż firmę
                </a>
                <a rel="noopener noreferrer" href="#">
                  Dołącz do istniejącej
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-sm font-semibold tracki uppercase dark:text-gray-400">
                Statystyki
              </h2>
              <div className="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#">
                  Lista najlepszych firm
                </a>
                <a rel="noopener noreferrer" href="#">
                  Lista najlepszych kierowców
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-sm font-semibold tracki uppercase dark:text-gray-400">
                O Mnie
              </h2>
              <div className="flex flex-col space-y-1">
                <a rel="noopener noreferrer" href="#">
                  Zarządzaj profilem.
                </a>
              </div>
            </div>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
