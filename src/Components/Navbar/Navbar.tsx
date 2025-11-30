import { useClerk, useUser, UserButton } from "@clerk/clerk-react";
import { ArrowRight, HeartPlusIcon, User2Icon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navOptions = [
    { id: 1, name: "Dashboard", link: "/dashboard" },
    { id: 2, name: "History", link: "/history" },

    { id: 3, name: "Pricing", link: "/pricing" },
    { id: 4, name: "Profile", link: "/profile" },
  ];

  return (
    <div className="navbar min-w-full bg-blue-600 shadow-sm px-4 xl:px-12">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 shadow"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <Link
          to={"/"}
          className="btn px-12 rounded-2xl text-sky-400  bg-white  hover:scale-105 active:scale-95 text-xl"
        >
          <HeartPlusIcon className="size-7 " />
          Medical.AI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {user ? (
          <ul className="menu menu-horizontal px-1 gap-4 text-lg">
            {navOptions.map((item) => {
              return (
                <li key={item.id}>
                  <Link
                    className="btn px-8  bg-white hover:bg-white/70 rounded-2xl hover:scale-105 active:scale-95"
                    to={item.link}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <></>
        )}
      </div>
      <div className="navbar-end">
        {user ? (
          <UserButton />
        ) : (
          <>
            <User2Icon
              onClick={() => openSignIn()}
              className="size-8 md:size-10 md:hidden border-2 border-black p-1 rounded-full"
            />{" "}
            <button
              className="hidden btn bg-white hover:bg-white/70 hover:scale-105 active:scale-95 
              md:flex rounded-full px-10 "
              onClick={() => openSignIn()}
            >
              <span className=" text-black text-md">Get Started</span>{" "}
              <ArrowRight className="size-5 text-black" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
