import { magic } from "./magic";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuItems,
  MenuItemImplProps,
  MenuLink,
  useMenuButtonContext,
} from "@reach/menu-button";
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
      "menu-link"?: HTMLElement<any>;

      menubutton?: HTMLElement<typeof MenuButton>;
      menuitem?: HTMLElement<"div"> &
        Omit<MenuItemImplProps, keyof HTMLElement<"div">>;
      menulist?: HTMLElement<typeof MenuList>;
      menulink?: HTMLElement<any>;
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

magic.menu = Menu as any;
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
