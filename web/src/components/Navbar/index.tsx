import { useClearGemProgress } from "../../state/gem-progress";
import { pobCodeAtom } from "../../state/pob-code";
import { routeSelector } from "../../state/route";
import { routeFilesSelector } from "../../state/route-files";
import { useClearRouteProgress } from "../../state/route-progress";
import { useClearCollapseProgress } from "../../state/section-collapse";
import { borderListStyles, interactiveStyles } from "../../styles";
import { trackEvent } from "../../utility/telemetry";
import styles from "./styles.module.css";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaGithub,
  FaMap,
  FaRegClipboard,
  FaTools,
  FaUndoAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRecoilCallback, useRecoilValue } from "recoil";

interface NavbarItemProps {
  label: string;
  icon?: React.ReactNode;
  expand: boolean;
  onClick: () => void;
}

// Individual navigation item component
function NavbarItem({ label, expand, icon, onClick }: NavbarItemProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(styles.navItem, styles.navElement, {
        [styles.expand]: expand,
        [borderListStyles.item]: expand,
        [interactiveStyles.activeSecondary]: !expand,
        [interactiveStyles.hoverPrimary]: expand,
      })}
    >
      {icon}
      {label}
    </button>
  );
}

interface NavbarProps {}

// Main navigation bar component
export function Navbar({}: NavbarProps) {
  // State for controlling navbar expansion
  const [navExpand, setNavExpand] = useState<boolean>(false);
  const navigate = useNavigate();

  // Callback to copy current route and PoB code to clipboard
  const clipboardRoute = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const route = await snapshot.getPromise(routeSelector);
        const pobCode = await snapshot.getPromise(pobCodeAtom);

        const output =
          pobCode === null
            ? [...route, `pob-code:none`]
            : [...route, `pob-code:${pobCode}`];
        navigator.clipboard.writeText(JSON.stringify(output));
      },
    []
  );
  // Hooks for clearing different types of progress
  const clearRouteProgress = useClearRouteProgress();
  const clearGemProgress = useClearGemProgress();
  const clearCollapseProgress = useClearCollapseProgress();

  const routeFiles = useRecoilValue(routeFilesSelector);

  return (
    // Main navbar container with conditional expansion styling
    <div
      className={classNames(styles.navbar, {
        [styles.expand]: navExpand,
      })}
    >
      {/* Container for hamburger button and navigation items */}
      <div
        className={classNames(styles.navHolder, {
          [styles.expand]: navExpand,
        })}
      >
        {/* Hamburger menu button to toggle navbar expansion */}
        <button onClick={() => setNavExpand(!navExpand)}>
          <FaBars
            aria-label="Menu"
            className={classNames(
              styles.navIcon,
              interactiveStyles.activePrimary
            )}
            display="block"
          />
        </button>
        {/* Main navigation container that shows/hides based on expansion */}
        <div
          className={classNames(styles.navMain, {
            [styles.expand]: navExpand,
          })}
        >
          {/* Container for navigation items */}
          <div
            className={classNames(styles.navItems, {
              [styles.expand]: navExpand,
            })}
          >
            {/* Route navigation - goes to home page */}
            <NavbarItem
              label="Route"
              expand={navExpand}
              icon={<FaMap className={classNames("inlineIcon")} />}
              onClick={() => {
                navigate("/");
                setNavExpand(false);
              }}
            />
            {/* Build navigation - goes to build page */}
            <NavbarItem
              label="Build"
              expand={navExpand}
              icon={<FaTools className={classNames("inlineIcon")} />}
              onClick={() => {
                navigate("/build");
                setNavExpand(false);
              }}
            />
            {/* Edit Route navigation - goes to route editor */}
            <NavbarItem
              label={`Edit Route`}
              expand={navExpand}
              icon={<FaTools className={classNames("inlineIcon")} />}
              onClick={() => {
                navigate(`/edit-route`);
                setNavExpand(false);
              }}
            />
            {/* Accordion for route sections - dynamically generated from route files */}
            <NavAccordion label="Sections" navExpand={navExpand}>
              {routeFiles.map((x, i) => (
                <NavbarItem
                  key={i}
                  label={x.name}
                  expand={navExpand}
                  onClick={() => {
                    navigate(`/#section-${x.name.replace(/\s+/g, "_")}`);
                    setNavExpand(false);
                  }}
                />
              ))}
            </NavAccordion>
            {/* Reset Progress - clears all user progress data */}
            <NavbarItem
              label="Reset Progress"
              expand={navExpand}
              icon={<FaUndoAlt className={classNames("inlineIcon")} />}
              onClick={() => {
                clearRouteProgress();
                clearGemProgress();
                clearCollapseProgress();

                setNavExpand(false);
              }}
            />
            {/* 3rd-Party Export - copies route data to clipboard for external tools */}
            <NavbarItem
              label="3rd-Party Export"
              expand={navExpand}
              icon={<FaRegClipboard className={classNames("inlineIcon")} />}
              onClick={() => {
                clipboardRoute();
                trackEvent({ name: "3rd-Party Export" });
                toast.success("Exported to Clipboard");
                setNavExpand(false);
              }}
            />
            {/* GitHub link - opens project repository in new tab */}
            <NavbarItem
              label="Project on Github"
              expand={navExpand}
              icon={<FaGithub className={classNames("inlineIcon")} />}
              onClick={() => {
                window
                  .open(
                    "https://github.com/HeartofPhos/exile-leveling",
                    "_blank"
                  )
                  ?.focus();
                setNavExpand(false);
              }}
            />
          </div>
          {/* Separator line when navbar is expanded */}
          {navExpand && <hr />}
        </div>
      </div>
      {/* Bottom separator line */}
      <hr />
    </div>
  );
}

interface NavAccordionProps {
  label: string;
  navExpand: boolean;
}

// Accordion component for grouping navigation items (like route sections)
function NavAccordion({
  label,
  navExpand,
  children,
}: React.PropsWithChildren<NavAccordionProps>) {
  // State for accordion expansion
  const [accordionExpand, setAccordionExpand] = useState<boolean>(false);

  // Collapse accordion when main navbar collapses
  useEffect(() => {
    setAccordionExpand(false);
  }, [navExpand]);
  
  return (
    <>
      {/* Accordion header - clickable to expand/collapse */}
      <NavbarItem
        label={label}
        expand={navExpand}
        onClick={() => {
          setAccordionExpand(!accordionExpand);
        }}
      />
      {/* Separator line when accordion is expanded */}
      {accordionExpand && <hr />}
      {/* Container for accordion content */}
      <div
        className={classNames(styles.navAccordion, styles.navItems, {
          [styles.expand]: accordionExpand,
        })}
      >
        {children}
      </div>
      {accordionExpand && <hr />}
    </>
  );
}
