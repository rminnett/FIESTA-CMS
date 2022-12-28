import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../util/container";
import { useTheme } from ".";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Icon } from "../util/icon";

export const Header = ({ data }) => {
  const router = useRouter();
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const headerColor = {
    default:
      "text-white bg-mono-900",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500",
    },
  };

  const headerColorCss =
    data.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  const activeItemClasses = {
    blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
    teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
    green:
      "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
    red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
    pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
    purple:
      "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
    orange:
      "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
    yellow:
      "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
  };

  const activeBackgroundClasses = {
    blue: "text-blue-500",
    teal: "text-teal-500",
    green: "text-green-500",
    red: "text-red-500",
    pink: "text-pink-500",
    purple: "text-purple-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

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
      <input id="vertical-header" type="checkbox" className="drawer-toggle" />
      <HorizontalHeader />
      <HorizontalHeader fixed />
      <VericalHeader />
    </>
  );
};
