import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import logo from "../../public/logo.png";
import Image from "next/image";
import { BiMenu as MenuIcon } from "react-icons/bi";

export const Header = ({ data }) => {
  const router = useRouter();
  const theme = useTheme();

  // If we're on an admin path, other links should also link to their admin paths
  const [prefix, setPrefix] = React.useState("");
  React.useEffect(() => {
    if (window && window.location.pathname.startsWith("/admin")) {
      setPrefix("/admin");
    }
  }, []);

  const HorizontalHeader = ({ fixed = false }) => (
    <div
      className={`${fixed && 'fixed'} z-50 w-full overflow-hidden bg-gradient-to-b ${headerColorCss}`}
    >
      <Container size="custom" className="py-0">
        <div className="flex items-center justify-between gap-10">
          <div className="select-none shrink-0 transition duration-150 ease-out transform">
            <Link href="/" passHref>
              <a><Image src={logo} /></a>
            </Link>
          </div>
          <ul className="grow flex gap-4 tracking-[.002em] -mx-4">
            {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                  item.href === "" || item.href === "/"
                    ? router.asPath === "/"
                    : router.asPath.includes(item.href);
                return (
                  <li
                    key={`${item.label}-${i}`}
                    className={`${activeItem ? activeItemClasses[theme.color] : 'hidden'} lg:inline-block`}
                  >
                    <Link href={`${prefix}/${item.href}`} passHref>
                      <a
                        className={`
                          inline-block relative select-none text-base whitespace-nowrap tracking-wide transition
                          duration-150 ease-out hover:opacity-100 py-8 px-4 ${activeItem ? `` : `opacity-70`}
                        `}
                      >
                        {item.label}
                        {activeItem && (
                          <svg
                            className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15 ${activeBackgroundClasses[theme.color]
                              }`}
                            preserveAspectRatio="none"
                            viewBox="0 0 230 230"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="230"
                              y="230"
                              width="230"
                              height="230"
                              transform="rotate(-180 230 230)"
                              fill="url(#paint0_radial_1_33)"
                            />
                            <defs>
                              <radialGradient
                                id="paint0_radial_1_33"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                              >
                                <stop stopColor="currentColor" />
                                <stop
                                  offset="1"
                                  stopColor="currentColor"
                                  stopOpacity="0"
                                />
                              </radialGradient>
                            </defs>
                          </svg>
                        )}
                      </a>
                    </Link>
                  </li>
                );
              })}
          </ul>
          <div className="cursor-pointer" onClick={() => setIsMenuOpen(true)}>
            <Icon data={{ name: "BiMenu" }} className="lg:hidden" />
          </div>
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${data.color === "primary" ? `via-white` : `via-black dark:via-white`
            } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
        />
      </Container>
    </div>
  );

  const VericalHeader = () => (
    <div className={`${!isMenuOpen && 'hidden'} fixed z-50 right-0 h-full bg-gradient-to-b ${headerColorCss}`}>
      <div className="flex items-center justify-between gap-10">
        <div className="cursor-pointer" onClick={() => setIsMenuOpen(false)}>
          <Icon data={{ name: "BiX" }} className="lg:hidden" />
        </div>
        <ul className="grow flex gap-4 tracking-[.002em] -mx-4">
          {data.nav &&
            data.nav.map((item, i) => {
              const activeItem =
                item.href === "" || item.href === "/"
                  ? router.asPath === "/"
                  : router.asPath.includes(item.href);
              return (
                <li
                  key={`${item.label}-${i}`}
                  className={`${activeItem ? activeItemClasses[theme.color] : 'hidden'} lg:inline-block`}
                >
                  <Link href={`${prefix}/${item.href}`} passHref>
                    <a
                      className={`
                          inline-block relative select-none text-base whitespace-nowrap tracking-wide transition
                          duration-150 ease-out hover:opacity-100 py-8 px-4 ${activeItem ? `` : `opacity-70`}
                        `}
                    >
                      {item.label}
                      {activeItem && (
                        <svg
                          className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15 ${activeBackgroundClasses[theme.color]
                            }`}
                          preserveAspectRatio="none"
                          viewBox="0 0 230 230"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="230"
                            y="230"
                            width="230"
                            height="230"
                            transform="rotate(-180 230 230)"
                            fill="url(#paint0_radial_1_33)"
                          />
                          <defs>
                            <radialGradient
                              id="paint0_radial_1_33"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                            >
                              <stop stopColor="currentColor" />
                              <stop
                                offset="1"
                                stopColor="currentColor"
                                stopOpacity="0"
                              />
                            </radialGradient>
                          </defs>
                        </svg>
                      )}
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
      
  return (
    <>
      <div className="fixed z-50 drawer drawer-end lg:hidden">
        <input id="side-menu" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="navbar bg-neutral-900 lg:hidden">
            <div className="navbar-start">
              <Link href="/" passHref>
                <a><Image src={logo} /></a>
              </Link>
            </div>
            <div className="navbar-end">
              <label tabIndex={0} htmlFor="side-menu" className="drawer-button btn btn-primary btn-link">
                <MenuIcon fontSize="4em" />
              </label>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="side-menu" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                  item.href === "" || item.href === "/"
                    ? router.asPath === "/"
                    : router.asPath.includes(item.href);
                return (
                  <li>
                    <Link href={`${prefix}/${item.href}`} passHref>
                      <a>{item.label}</a>
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
      <div className="navbar bg-neutral-900 hidden lg:flex">
        <div className="navbar-start">
          <Link href="/" passHref>
            <a><Image src={logo} /></a>
          </Link>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                  item.href === "" || item.href === "/"
                    ? router.asPath === "/"
                    : router.asPath.includes(item.href);
                return (
                  <li>
                    <Link href={`${prefix}/${item.href}`} passHref>
                      <a>{item.label}</a>
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </div>
      </div>
    </>
  );
};
