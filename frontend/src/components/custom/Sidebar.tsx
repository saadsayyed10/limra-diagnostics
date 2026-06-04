import { Link, useLocation } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Patients",
    path: "/patients/obs",
  },
  {
    name: "F Form",
    path: "/fform",
  },
  {
    name: "Reports",
    path: "/reports",
  },
  {
    name: "ANC Schedule",
    path: "/anc-schedule",
  },
  {
    name: "Billing",
    path: "/billing",
  },
  {
    name: "Clinic",
    path: "/clinic",
  },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 border-r border-zinc-200 bg-white min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold">LIMRA Diagnostics</h1>
      </div>

      <nav className="px-3">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block rounded-lg px-4 py-3 mb-2 transition ${
              location.pathname === link.path
                ? "bg-neutral-100 text-neutral-600 font-medium"
                : "hover:bg-zinc-100"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
