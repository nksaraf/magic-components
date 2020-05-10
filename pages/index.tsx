import Head from "next/head";
import React from "react";
import { css, useTheme, magic, motion } from "magic-components";

import {
  RadixProvider,
  Select as BaseSelect,
  Option as BaseOption,
  Box,
  Menu,
  MenuItem,
  MenuItemSeparator,
  MenuItemLabel,
  MenuItemCheckbox,
  MenuItemRadioGroup,
  MenuItemRadio,

  // @ts-ignore
  selectStyleConfig,
  theme,
} from "@modulz/radix";
import { createStyleConfig, createStyleProp, themed } from "../src";

const Select = magic.custom(
  BaseSelect,
  {
    styleConfig: selectStyleConfig,
  },
  {
    processCSS: createStyleConfig("menu"),
    displayName: "Select",
    // wrapComponent: undefined,
  }
);

const Option = magic.custom(
  BaseOption,
  {},
  {
    processCSS: createStyleProp,
    wrapComponent: undefined,
  }
);

function Other() {
  const [isChecked, setIsChecked] = React.useState(true);
  const [value, setValue] = React.useState("2");
  const targetRef = React.useRef();
  const ref = React.useRef();
  if (typeof window !== "undefined") {
    window.reference = ref;
  }

  return (
    <div height="243px">
      <Select
        ref={ref}
        // width="150px"
        css={{
          // bg: "red",
          // button: {
          // },
          button: {
            normal: { width: 150 },
          },
          item: {
            normal: { color: "green" },
            highlighted: { color: "black" },
          },
        }}
      >
        <Option value="helloworld" label="hello" />
        <Option value="1" label="x" />
        <Option value="2" label="y" />
      </Select>
      <div ref={targetRef} />
      {/* <Menu
        // bg="red100"
        // animate={{ color: "blue" }}
        isOpen
        buttonRef={targetRef}
      >
        <MenuItem style={{ color: "green" }} label="aSimple item one" />
        <MenuItem label="Simple item two" />
        <MenuItem label="Simple item three" />
        <MenuItemSeparator />
        <MenuItemLabel>An item label</MenuItemLabel>
        <MenuItemSeparator />
        <MenuItemCheckbox
          label="Checkbox item"
          checked={isChecked}
          onChange={setIsChecked}
        />
        <MenuItemSeparator />
        <MenuItemRadioGroup value={value} onChange={setValue}>
          <MenuItemRadio value="1" label="Radio item one" />
          <MenuItemRadio value="2" label="Radio item two" />
          <MenuItemRadio value="3" label="Radio item three" />
        </MenuItemRadioGroup>
      </Menu>*/}
    </div>
  );
}

// function Example() {
//   return (
//     <>
//       <menu>
//         <menu-button
//           onMouseDown={() => {}}
//           color="red.600"
//           whileHover={{ backgroundColor: "green.100" }}
//         >
//           {" "}
//           Actions <span aria-hidden>▾</span>
//         </menu-button>
//         <menu-popover
//           // animate
//           color="red.100"
//           initial={{ scale: 0, y: "-40%", x: "-50%", opacity: 0 }}
//           animate={{ scale: 1, y: "0%", x: "0%", opacity: 1 }}
//           exit={{ scale: 0, y: "-40%", x: "-50%", opacity: 0 }}
//         >
//           <menu-items>
//             <menu-item
//               color="blue.500"
//               whileHover={{ backgroundColor: "red.100" }}
//               onSelect={() => alert("Download")}
//             >
//               Download as
//             </menu-item>
//             <menu-item onSelect={() => alert("Copy")}>Create a Copy</menu-item>
//             <menu-item onSelect={() => alert("Mark as Draft")}>
//               Mark as Draft
//             </menu-item>
//             <menu-item onSelect={() => alert("Delete")}>Delete</menu-item>
//             <menu-link href="https://reacttraining.com/workshops/">
//               Attend a Workshop
//             </menu-link>
//           </menu-items>
//         </menu-popover>
//       </menu>
//     </>
//   );
// }

const variants = {
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.3,
    },
  }),
  hidden: { opacity: 0 },
};

export default () => {
  const [state, setState] = React.useState(false);
  return (
    <>
      <Head>
        <title>World</title>
        <link href="hello" />
      </Head>
      <Other />
      {/* <Random /> */}
      {/* <Example /> */}
    </>
  );
};

// const Random = () => {
//   return (
//     <>
//       <row animate={{ x: 100 }} gap={2}>
//         <div>hello world</div>
//         <div>hello other world</div>
//       </row>
//       <div muggle id="hello">
//         HELO
//       </div>
//       <css css={{ body: { backgroundColor: "red.300" } }} id={"1"} />
//       <row bg="red.100" asProps={{ "aria-label": "a" }}>
//         <div as="h1">hello world</div>
//         <div style={{ marginLeft: 100, width: "100%" }}>hello world</div>
//         <div className={css({ backgroundColor: "green.100" })}>
//           hello oth world
//         </div>
//       </row>
//       <stack gap={4} direction="vertical">
//         <p
//           id="hello"
//           css={{
//             "&:hover": {
//               color: "green.100",
//             },
//             color: "red.100",
//           }}
//         >
//           Hello Worl Iadsadw
//         </p>
//         <div color="green.900">Hello World Ne Iadsadw</div>
//         <div
//           color="green.900"
//           variants={{
//             open: { color: ["red.100", "red.200", "red.300"] },
//             close: { color: "green.300" },
//           }}
//           // animate={state ? "open" : "close"}
//         >
//           Hello World Ne Iadsadw
//         </div>
//       </stack>
//       <div color="red.100" whileHover={{ x: "100px" }} id="hello">
//         Hello World Ne Iadsadw
//       </div>
//       <button
//         // onTap={() => setState((s) => !s)}
//         whileTap={{ scale: 0.9 }}
//         whileHover={{ scale: 1.1 }}
//       >
//         Click me
//       </button>
//       {[1, 2, 3, 4, 5].map((item, i) => (
//         <li
//           custom={i}
//           initial={"hidden"}
//           animate="visible"
//           variants={variants}
//         />
//       ))}
//     </>
//   );
// };
