import { magic, addMagicComponent } from "../core/magic";
import {
  Menu as ReachMenu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuItems,
  MenuItemProps,
  MenuLink,
  useMenuButtonContext,
  MenuButtonProps,
  MenuListProps,
  MenuItemsProps,
  MenuLinkProps,
} from "@reach/menu-button";
import { PropsWithAs, As, useForkedRef, ComponentWithAs } from "@reach/utils";
import { withGlobalStyle } from "../global";
import React from "react";
import { AnimatePresence } from "framer-motion";

declare global {
  namespace Magic {
    interface HTMLElementProps {
      menu?: Omit<React.ComponentProps<typeof ReachMenu>, "children">;

      "menu-button"?: PropsWithAs<
        ComponentWithAs<"button", MagicProps>,
        MenuButtonProps
      >;
      "menu-item"?: PropsWithAs<
        ComponentWithAs<"div", MagicProps>,
        MenuItemProps
      >;
      "menu-list"?: PropsWithAs<
        ComponentWithAs<"div", MagicProps>,
        MenuListProps
      >;
      "menu-link"?: PropsWithAs<
        ComponentWithAs<"a", MagicProps>,
        MenuLinkProps
      >;
      "menu-popover"?: HTMLElement<typeof MenuPopover>;
      "menu-items"?: PropsWithAs<
        ComponentWithAs<"div", MagicProps>,
        MenuItemsProps
      >;

      menubutton?: PropsWithAs<
        ComponentWithAs<"button", MagicProps>,
        MenuButtonProps
      >;
      menuitem?: PropsWithAs<ComponentWithAs<"div", MagicProps>, MenuItemProps>;
      menulist?: PropsWithAs<ComponentWithAs<"div", MagicProps>, MenuListProps>;
      menulink?: PropsWithAs<ComponentWithAs<"a", MagicProps>, MenuLinkProps>;
      menupopover?: HTMLElement<typeof MenuPopover>;
      menuitems?: PropsWithAs<
        ComponentWithAs<"div", MagicProps>,
        MenuItemsProps
      >;
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

  console.log(isExpanded);

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
      {isExpanded ? (
        <magic.div exit={{ display: "none" }} {...commonProps} />
      ) : null}
    </AnimatePresence>
  );
  // );
});

addMagicComponent(
  "menu",
  withGlobalStyle(
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
  )
);

const addReachComponent = <T extends As, P>(
  name: string,
  Component: any,
  asComponent: T,
  defaultProps = {}
) => {
  addMagicComponent(
    name,
    React.forwardRef(
      ({ as = asComponent, ...props }: PropsWithAs<T, P>, ref) => (
        <Component as={as} {...defaultProps} {...props} ref={ref} />
      )
    )
  );
};

addReachComponent<typeof magic.button, MenuButtonProps>(
  "menu-button",
  MenuButton,
  magic.button
);

addReachComponent<typeof magic.div, MenuItemProps>(
  "menu-item",
  MenuItem,
  magic.div
);

addReachComponent<typeof magic.div, MenuListProps>(
  "menu-list",
  MenuList,
  magic.div
);

addReachComponent<typeof magic.div, MenuItemsProps>(
  "menu-items",
  MenuItems,
  magic.div
);

addReachComponent<typeof magic.a, MenuLinkProps>(
  "menu-link",
  MenuLink,
  magic.a
);

addMagicComponent("menu-popover", MenuPopover);
