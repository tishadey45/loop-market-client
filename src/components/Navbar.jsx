"use client";

import logo from "@/assets/logo.png";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // const user = "Probir Ghosh"; // Mock user for demonstration
  // const isPending = false; // Mock pending state for demonstration

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const navLinks = (
    <>
      <li>
        <Link href="/" className="text-blue-600 font-bold hover:text-emerald-600 transition-colors">
          Home
        </Link>
      </li>
      <li>
        <Link href="/products" className="text-blue-600 font-bold hover:text-emerald-600 transition-colors">
          Products
        </Link>
      </li>
      <li>
        <Link href="/categories" className="text-blue-600 font-bold hover:text-emerald-600 transition-colors">
          Categories
        </Link>
      </li>

      {user && (
        <li>
          <Link href="/dashboard" className="text-blue-600 font-bold hover:text-emerald-600 transition-colors">
            Dashboard
          </Link>
        </li>
      )}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">

        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-50 p-3 shadow bg-base-100 rounded-box w-56 gap-1"
            >
              {navLinks}
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="LoopMarket Logo"
              width={40}
              height={40}
              priority
              className="object-contain"
            />
            <span className="font-extrabold text-xl bg-linear-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent hidden sm:inline-block">
              LoopMarket
            </span>
          </Link>
        </div>

        {/* Navbar Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 font-medium px-1">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End: User Profile Dropdown / Login-Register */}
        <div className="navbar-end gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-blue-600"></span>
          ) : user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer avatar">
                <div className="w-10 rounded-full ring ring-emerald-500 ring-offset-base-100 ring-offset-2">
                  <Image
                    src={
                      user.image ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=047857&color=fff`
                    }
                    alt={user.name || "User Profile"}
                    width={100}
                    height={100}
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-50 w-60 bg-base-100 rounded-box shadow-lg border p-2"
              >
                <li className="px-4 py-2 pointer-events-none">
                  <p className="font-bold text-gray-800">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </li>

                <div className="divider my-1"></div>

                <li>
                  <Link href="/dashboard" className="font-medium">
                    My Dashboard
                  </Link>
                </li>
                
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-medium hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <button className="btn btn-sm sm:btn-md rounded-full bg-transparent border-blue-600 text-blue-600 hover:bg-blue-50 transition-all px-5">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="btn btn-sm sm:btn-md rounded-full bg-linear-to-r from-blue-600 to-emerald-600 text-white border-none hover:shadow-lg transition-all px-5">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}