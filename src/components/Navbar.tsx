import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [routes] = useState([
        { name: "Home", path: "/" },
        // { name: "Dashboard", path: "/dashboard" },
        // { name: "Profile", path: "/profile" },
        { name: "Resume", path: "/resume" },
    ]);

    // Example: Dynamically remove "Resume" route
    // const removeResumeRoute = () =>
    //     setRoutes((prev) => prev.filter((route) => route.name !== "Resume"));

    return (
        <nav className="bg-gray-800 text-white p-4 print:hidden">
            <ul className="flex space-x-4">
                {routes.map((route) => (
                    <li key={route.path}>
                        <Link href={route.path} className="hover:text-gray-400">
                            {route.name}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* <button onClick={removeResumeRoute} className="mt-2 px-4 py-2 bg-red-500 rounded">
                Remove Resume Route
            </button> */}
        </nav>
    );
}