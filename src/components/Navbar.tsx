import * as React from "react";
import Grid from "./Grid/web";
import Section from "./Section";
import Logo from "./Logo";
import Search from "./Search";
import Link from "./Link";
// @ts-ignore
import NextNprogress from "./NextNProgress";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "../store";
import { navigationActions } from "../store/ducks/navigation";
import { searchActions } from "../store/ducks/search";
import cn from "classnames";
import FocusTrap from "focus-trap-react";
import { Twirl as Hamburger } from "hamburger-react";
import { useAmp } from "next/amp";
import dynamic from "next/dynamic";
import Styles from "./Navbar.styles";
const { classNames, StyleSheet } = Styles;

export const ScrollLock = dynamic(() => import("./ScrollLock"), {
  ssr: false,
});

export const NAVBAR_HEIGHT = 60;

const navbarLinks: {
  title: string;
  href: string;
  mobileOnly?: boolean;
  ariaLabel?: string;
}[] = [
  {
    title: "News",
    href: "/section/news",
  },
  {
    title: "Sports",
    href: "/section/sports",
  },
  {
    title: "Opinions",
    href: "/section/opinions",
  },
  {
    title: "Inside Beat",
    href: "/section/inside-beat",
  },
  {
    title: "Videos",
    href: "/videos",
  },
  {
    title: "Podcasts",
    href: "/podcasts",
  },
  // {
  //   title: 'Photos',
  //   href: '/photos'
  // },
  {
    title: "HoRU",
    href: "/section/humans-of-rutgers",
    ariaLabel: "Humans of Rutgers",
  },
  {
    title: "Donate",
    href: "https://www.paypal.com/donate/?hosted_button_id=GPJZ5VKSNUBRQ",
    ariaLabel: "Donate",
  },
  {
    title: "About",
    href: "/page/about",
  },
];

function MobileMenu() {
  const isVisible = useSelector((s) => s.navigation.mobileMenuVisible);
  const searchFocused = useSelector((s) => s.search.focused);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAmp = useAmp();

  // const { toggleScrollock } = useScrollock();

  // React.useEffect(() => {
  //   toggleScrollock(isVisible);
  // }, [isVisible]);

  React.useEffect(() => {
    if (isVisible) {
      dispatch(navigationActions.closeMobileMenu());
    }
  }, [router.pathname]);

  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.keyCode === 27 && isVisible) {
        if (searchFocused) {
          dispatch(searchActions.setFocused(false));
        } else {
          dispatch(navigationActions.closeMobileMenu());
        }
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isVisible, searchFocused]);

  return isAmp ? (
    <>
      <amp-sidebar
        id="sidebar1"
        layout="nodisplay"
        side="right"
        className={classNames.mobileMenu}
      >
        {navbarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(classNames.mobileLink, {
              [classNames.linkActive]: link.href === router.asPath,
            })}
            label={link.ariaLabel}
            onClickSideEffect={() =>
              dispatch(navigationActions.closeMobileMenu())
            }
          >
            <span>{link.title}</span>
          </Link>
        ))}
      </amp-sidebar>
      <style jsx global>
        {`
          [class*="amphtml-sidebar-mask"] {
            display: none;
          }
        `}
      </style>
    </>
  ) : (
    <>
      <ScrollLock active={isVisible} />
      <Grid.Display xs={true} lg={false}>
        <div
          className={cn(classNames.mobileMenu, {
            [classNames.fadeIn]: isVisible,
            [classNames.fadeOut]: !isVisible,
          })}
        >
          <Search.PreviewBackdrop />

          <Search.Input
            enabled={isVisible}
            size={2.7}
            className={classNames.search}
            onSubmit={() => {
              dispatch(searchActions.setFocused(false));
              dispatch(navigationActions.closeMobileMenu());
              router.push("/search", undefined, { shallow: true });
            }}
            maxItems={10}
          />

          {navbarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(classNames.mobileLink, {
                [classNames.linkActive]: link.href === router.asPath,
              })}
              label={link.ariaLabel}
              onClickSideEffect={() =>
                dispatch(navigationActions.closeMobileMenu())
              }
            >
              <span>{link.title}</span>
            </Link>
          ))}
        </div>
      </Grid.Display>
    </>
  );
}

export function Navbar() {
  const darkNavbar = useSelector((s) => s.navigation.darkNavbar);
  const router = useRouter();
  const dispatch = useDispatch();
  const mobileMenuVisible = useSelector((s) => s.navigation.mobileMenuVisible);
  const searchHijacked = useSelector((s) => s.search.hijacked);
  const isAmp = useAmp();

  return (
    <>
      <NextNprogress
        options={{
          showSpinner: false,
        }}
      />

      <FocusTrap active={mobileMenuVisible}>
        <div
          className={cn(classNames.navbarWrap, "fixed-element", {
            ["dark-mode"]: darkNavbar,
          })}
        >
          <Section
            className={cn(classNames.navbar, {
              [classNames.opaque]: mobileMenuVisible,
            })}
            styleInside={{
              overflow: "visible",
            }}
          >
            <nav>
              <Grid.Display xs={false} lg={true} style={{ flex: 1 }}>
                <div className={classNames.inner}>
                  <Link
                    href="/"
                    label="Go to homepage"
                    tooltipPosition="none"
                    onClickSideEffect={() => {
                      dispatch(navigationActions.closeMobileMenu());
                    }}
                  >
                    <Logo className={classNames.logo} />
                  </Link>

                  <div className={classNames.links}>
                    {navbarLinks
                      .filter((l) => !l.mobileOnly)
                      .map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          label={link.ariaLabel}
                          className={cn(classNames.link, {
                            [classNames.linkActive]:
                              link.href === router.asPath,
                          })}
                        >
                          <span>{link.title}</span>
                        </Link>
                      ))}
                  </div>

                  <Search.PreviewBackdrop />

                  <Search.Input
                    width={175}
                    size={2.1}
                    enabled={!mobileMenuVisible && !searchHijacked}
                    onSubmit={() => {
                      router.push("/search", undefined, { shallow: true });
                    }}
                  />
                </div>
              </Grid.Display>

              <Grid.Display xs={true} lg={false}>
                <div className={classNames.inner}>
                  <Search.PreviewBackdrop
                    style={{
                      height: NAVBAR_HEIGHT,
                    }}
                  />

                  <Link
                    href="/"
                    label="Go to homepage"
                    tooltipPosition="none"
                    onClickSideEffect={() => {
                      dispatch(navigationActions.closeMobileMenu());
                    }}
                  >
                    <Logo className={classNames.logo} />
                  </Link>

                  {isAmp ? (
                    // @ts-ignore
                    <button on="tap:sidebar1.toggle">
                      <Hamburger />
                    </button>
                  ) : (
                    <Hamburger
                      label={`${
                        mobileMenuVisible ? "Close" : "Open"
                      } navigation menu`}
                      color="var(--colors-text)"
                      duration={0.3}
                      hideOutline={false}
                      toggled={mobileMenuVisible}
                      toggle={() =>
                        dispatch(navigationActions.toggleMobileMenu())
                      }
                    />
                  )}
                </div>
              </Grid.Display>
            </nav>
          </Section>

          <MobileMenu />
        </div>
      </FocusTrap>
      <div className={classNames.navbarSpacer} />
      {StyleSheet}
    </>
  );
}

export function useDynamicHeader() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(navigationActions.enableDarkNavbar());
    return () => {
      dispatch(navigationActions.disableDarkNavbar());
    };
  }, []);
}

Navbar.useDynamicHeader = useDynamicHeader;
export default Navbar;
