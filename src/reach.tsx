import { magic } from "./magic";
import {
  Menu as ReachMenu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuItems,
  MenuItemImplProps,
  MenuLink,
  useMenuButtonContext,
} from "@reach/menu-button";
import { Global } from "./global";
import React from "react";
import { AnimatePresence } from "framer-motion";

declare global {
  namespace Magic {
    interface HTMLElements {
      menu?: Omit<
        React.ComponentProps<typeof Menu>,
        "children"
        // keyof React.HTMLAttributes<any>
      >;
      // @ts-ignore
      "menu-button"?: HTMLElement<typeof MenuButton>;
      "menu-item"?: HTMLElement<"div"> &
        Omit<MenuItemImplProps, keyof HTMLElement<"div">>;
      "menu-list"?: HTMLElement<typeof MenuList>;
      "menu-link"?: HTMLElement<typeof MenuLink>;
      "menu-popover"?: HTMLElement<typeof MenuPopover>;
      "menu-items"?: HTMLElement<typeof MenuItems>;

      menubutton?: HTMLElement<typeof MenuButton>;
      menuitem?: HTMLElement<"div"> &
        Omit<MenuItemImplProps, keyof HTMLElement<"div">>;
      menulist?: HTMLElement<typeof MenuList>;
      menulink?: HTMLElement<typeof MenuLink>;
      menupopover?: HTMLElement<typeof MenuPopover>;
      menuitems?: HTMLElement<typeof MenuItems>;
    }
  }
}

export const MenuPopover = React.forwardRef<any, any>(function MenuPopover(
  { children, portal = true, position, ...props },
  forwardedRef
) {
  const {
    // buttonRef,
    // buttonClickedRef,
    // dispatch,
    // menuRef,
    // popoverRef,
    isExpanded,
  } = useMenuButtonContext();

  // const ref = useForkedRef(popoverRef, forwardedRef);

  // useEffect(() => {
  //   function listener(event: MouseEvent) {
  //     if (buttonClickedRef.current) {
  //       buttonClickedRef.current = false;
  //     } else {
  //       let { relatedTarget, target } = event;

  //       // We on want to close only if focus rests outside the menu
  //       if (isExpanded && popoverRef.current) {
  //         if (
  //           !popoverRef.current?.contains((relatedTarget || target) as Element)
  //         ) {
  //           dispatch({ type: CLOSE_MENU, payload: { buttonRef } });
  //         }
  //       }
  //     }
  //   }
  //   window.addEventListener("mousedown", listener);
  //   return () => {
  //     window.removeEventListener("mousedown", listener);
  //   };
  // }, [buttonClickedRef, buttonRef, dispatch, isExpanded, menuRef, popoverRef]);

  let commonProps = {
    ref: forwardedRef,
    // TODO: remove in 1.0
    "data-reach-menu": "",
    "data-reach-menu-popover": "",
    // hidden: !isExpanded,
    children,
    ...props,
  };

  // return portal ? (
  //   <Popover
  //     {...commonProps}
  //     targetRef={buttonRef as any}
  //     position={position}
  //   />
  // ) : (
  return (
    <AnimatePresence>
      {isExpanded && (
        <magic.div
          {...commonProps}
          // animate={isExpanded ? commonProps.animate : commonProps.initial}
        />
      )}
    </AnimatePresence>
  );
  // );
});

const withGlobalStyle = (
  id: string,
  css: {
    [k: string]: Magic.StyleProps;
  },
  Component: any
) => {
  return React.forwardRef((props, ref) => (
    <>
      <Global id={id} css={css} />
      <Component ref={ref} {...props} />
    </>
  ));
};

magic.menu = withGlobalStyle(
  "reach-menu-button-base",
  {
    ":root": { "-ReachMenuButton": "1" },
    "[data-reach-menu],\n[data-reach-menu-popover]": {
      display: "block",
      position: "absolute",
    },
    // "[data-reach-menu][hidden],\n[data-reach-menu-popover][hidden]": {
    //   opacity: "0",
    // },
    "[data-reach-menu-list],\n[data-reach-menu-items]": {
      display: "block",
      whiteSpace: "nowrap",
      border: "solid 1px hsla(0, 0%, 0%, 0.25)",
      background: "hsla(0, 100%, 100%, 0.99)",
      outline: "none",
      padding: "1rem 0",
      fontSize: "85%",
    },
    "[data-reach-menu-item]": {
      display: "block",
      userSelect: "none",
      cursor: "pointer",
      color: "inherit",
      font: "inherit",
      textDecoration: "initial",
      padding: "5px 20px",
    },
    "[data-reach-menu-item][data-selected]": {
      background: "hsl(211, 81%, 36%)",
      color: "white",
      outline: "none",
    },
  },
  ReachMenu
) as any;

magic["menu-button"] = magic.custom(MenuButton);
magic.menubutton = magic["menu-button"];

magic["menu-item"] = magic.custom(
  MenuItem,
  { as: magic.div },
  { forwardAs: true }
);
magic.menuitem = magic["menu-item"] as any;

magic["menu-list"] = magic.custom(
  MenuList,
  { as: magic.div },
  { forwardAs: true }
);
magic.menulist = magic["menu-list"];

magic["menu-popover"] = MenuPopover;
magic.menupopover = magic["menu-popover"];

magic["menu-items"] = magic.custom(
  MenuItems,
  { as: magic.div },
  { forwardAs: true }
);
magic.menuitems = magic["menu-items"];

magic["menu-list"] = magic.custom(
  MenuList,
  { as: magic.div },
  { forwardAs: true }
);
magic.menulist = magic["menu-list"];

magic["menu-link"] = magic.custom(
  MenuLink,
  { as: magic.a },
  { forwardAs: true }
);
magic.menulink = magic["menu-link"];
