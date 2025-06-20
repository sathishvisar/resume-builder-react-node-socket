import { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Icon, IconName } from "../Icon";
import { Navigation } from "../atoms/Typography";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  interface MenuItem {
    label: string;
    icon: IconName;
    link: string;
  }
  const menuItems: MenuItem[] = [
    { label: "Resumes", icon: "Resume", link: '/app/resumes'}
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 z-30 bg-white shadow-lg transition-all duration-300
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-16" : "w-56"}
          md:relative md:translate-x-0
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo/Brand */}
          <div className="flex h-16 items-center justify-center border-b border-gray-200">
            {isCollapsed ? (
              <div className="text-xl font-bold text-gray-800">RN</div>
            ) : (
              <h1 className="text-xl font-bold text-[#1e88ed]"><Icon name="Logo" /></h1>
            )}
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto py-2">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Navigation
                    onClick={()=>{navigate(item.link, {replace: true})}}
                    className={`
                      flex items-center overflow-hidden text-[#3E4265] 
                      hover:bg-[#1e88ed]/10 hover:text-[#1e88ed]
                      cursor-pointer
                      ${isCollapsed ? "mx-1 justify-center rounded-full p-3" : "mx-2 rounded-lg px-4 py-3"}
                    `}
                  >
                    <Icon name={item.icon} />
                    {!isCollapsed && (
                      <span className="ml-3 truncate font-medium">{item.label}</span>
                    )}
                  </Navigation>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className={`
        flex flex-1 flex-col overflow-hidden
        transition-[margin] duration-300
        ${isCollapsed ? "md:ml-16-rmv" : "md:ml-56-rmv"}
      `}>
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
          <div className="flex items-center">
            <button
              className="mr-4 text-[#3E4265] md:hidden"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              <span className="material-icons-outlined">menu</span>
            </button>
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`
                flex w-full items-center overflow-hidden rounded-lg p-2 text-[#3E4265]
                hover:bg-gray-100
                ${isCollapsed ? "justify-center" : "px-3"}
              `}
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              <Icon name="Menu" />
            </button>
          </div>

          {/* Profile menu */}
          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center gap-2"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="h-8 w-8 rounded-full"
              />
              <span className="hidden text-sm font-medium text-[#3E4265] md:block">
                John Doe
              </span>
              <Icon name="IconChevronRight" className={isProfileOpen ? '-rotate-90' : 'rotate-90'} />
              {/* <span className="material-icons-outlined text-[#3E4265]">
                 {isProfileOpen ? "expand_less" : "expand_more"}
              </span> */}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                <Navigation
                  className="block px-4 py-2 text-sm text-[#3E4265] hover:bg-gray-100 cursor-pointer"
                >
                  Your Profile
                </Navigation>
                <Navigation
                  href="#"
                  className="block px-4 py-2 text-sm text-[#3E4265] hover:bg-gray-100 cursor-pointer"
                >
                  Settings
                </Navigation>
                <button className="block w-full px-4 py-2 text-left text-sm text-[#3E4265] hover:bg-gray-100">
                  Sign out
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;