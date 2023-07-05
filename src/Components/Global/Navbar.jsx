import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleMenu = () => {
    setOpen(!open);
  };
  return (
    <div id="nav" className="px-4 shadow-xl sticky flex top-0 z-50 md:px-8 bg-[#F9F6EE] flex-row w-full items-center justify-center">
      <nav className="flex w-full font-bold text-sm md:text-[14px] items-center py-4 md:py-6 justify-between">
        {/*Logo */}
        <div>Logo</div>

        {/* Links */}
        <div className="md:flex hidden flex-row gap-4">
          <div className="flex flex-row">
            <ul className="flex flex-row gap-4">
              <li>
                <a
                  className=" hover:border-b-[1px] ease-in-out border-black transition-all duration-300"
                  href="/"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  className=" hover:border-b-[1px] ease-in-out border-black transition-all duration-300"
                  href="/"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  className=" hover:border-b-[1px] ease-in-out border-black transition-all duration-300"
                  href="/"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  className=" hover:border-b-[1px] ease-in-out border-black transition-all duration-300"
                  href="/"
                >
                  Help
                </a>
              </li>
            </ul>
          </div>

          {/* Access account button */}
          <div className="transition-all hover:scale-105 duration-300">
            <a href="" className="bg-[#010101] text-white p-2 rounded-2xl">
              Access your account
            </a>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          onClick={handleMenu}
          className="block md:hidden items-center justify-center"
        >
          {open ? (
            <div>
              {/* Cancel Button */}
              <button>
                <svg
                  viewBox="0 0 470 1000"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M452 656c12 12 18 26.333 18 43s-6 31-18 43c-12 10.667-26.333 16-43 16s-31-5.333-43-16L234 590 102 742c-12 10.667-26.333 16-43 16s-31-5.333-43-16C5.333 730 0 715.667 0 699s5.333-31 16-43l138-156L16 342C5.333 330 0 315.667 0 299s5.333-31 16-43c12-10.667 26.333-16 43-16s31 5.333 43 16l132 152 132-152c12-10.667 26.333-16 43-16s31 5.333 43 16c12 12 18 26.333 18 43s-6 31-18 43L314 500l138 156" />
                </svg>
              </button>

              {/* Link list Mobile */}
              <div className=" absolute right-0 h-screen w-1/2 bg-[#F9F6EE] shadow-2xl top-[100%]">
                <ul className="flex flex-col gap-2">
                  <li className="flex w-full">
                    <a className=" w-full hover:bg-gray-200 p-2" href="/">
                      Features
                    </a>
                  </li>
                  <li className="flex w-full">
                    <a className=" w-full hover:bg-gray-200 p-2" href="/">
                      Pricing
                    </a>
                  </li>
                  <li className="flex w-full">
                    <a className=" w-full hover:bg-gray-200 p-2" href="/">
                      About Us
                    </a>
                  </li>
                  <li className="flex w-full">
                    <a className=" w-full hover:bg-gray-200 p-2" href="/">
                      Help
                    </a>
                  </li>
                  <li className="flex w-full pl-2">
                    <a
                      href=""
                      className="bg-[#010101] text-white p-2 rounded-md"
                    >
                      Access your account
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              {/* Menu Button */}
              <button>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="1.5em"
                  width="1.5em"
                >
                  <path d="M4 6h16v2H4zm4 5h12v2H8zm5 5h7v2h-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;