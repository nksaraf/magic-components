import Head from "next/head";
import React from "react";
import { AnimatePresence, motion, AnimateSharedLayout } from "../src";

function Example() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <style
        id="reach-menu-button-base"
        css={{
          // ":root": { "--reach-menu-button": "1" },
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
        }}
      />
      <menu>
        <menu-button onMouseDown={() => {}}>
          Actions <span aria-hidden>▾</span>
        </menu-button>
        <menu-popover
          // animate
          color="red.100"
          initial={{ scale: 0, y: "-40%", x: "-50%", opacity: 0 }}
          animate={{ scale: 1, y: "0%", x: "0%", opacity: 1 }}
          exit={{ scale: 0, y: "-40%", x: "-50%", opacity: 0 }}
        >
          <menu-items>
            <menu-item
              color="black"
              whileHover={{ backgroundColor: "red.100" }}
              onSelect={() => alert("Download")}
            >
              Download
            </menu-item>
            <menu-item onSelect={() => alert("Copy")}>Create a Copy</menu-item>
            <menu-item onSelect={() => alert("Mark as Draft")}>
              Mark as Draft
            </menu-item>
            <menu-item onSelect={() => alert("Delete")}>Delete</menu-item>
            <menu-link href="https://reacttraining.com/workshops/">
              Attend a Workshop
            </menu-link>
          </menu-items>
        </menu-popover>
        {/* {({ isExpanded }) => (
          <> */}

        {/* </>
        )} */}
      </menu>
    </>
  );
}

// glob({
//   body: {
//     margin: "1px",
//   },
// });

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
      <Example />
    </>
  );
};

const Random = () => {
  return (
    <>
      {" "}
      <row animate={{ x: 100 }}>
        <div>hello world</div>
        <div>hello other world</div>
      </row>
      <style css={{ body: { backgroundColor: "red.300" } }} id={"1"} />
      <row bg="red.100" asProps={{ "aria-label": "a" }}>
        <div as="h1">hello world</div>
        <div style={{ marginLeft: 100, width: "100%" }}>hello world</div>
        <div>hello other world</div>
      </row>
      <stack gap={4}>
        <p
          id="hello"
          css={{
            "&:hover": {
              color: "green.100",
            },
            color: ["red.100", "blue.100", "green.100"],
          }}
        >
          Hello World Ne Iadsadw
        </p>
        <div color="green.900">Hello World Ne Iadsadw</div>
        <div
          color="green.900"
          variants={{
            open: { color: ["red.100", "red.200", "red.300"] },
            close: { color: "green.300" },
          }}
          // animate={state ? "open" : "close"}
        >
          Hello World Ne Iadsadw
        </div>
      </stack>
      <div color="red.100" whileHover={{ x: "100px" }} id="hello">
        Hello World Ne Iadsadw
      </div>
      <button
        // onTap={() => setState((s) => !s)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        Click me
      </button>
      {[1, 2, 3, 4, 5].map((item, i) => (
        <li
          custom={i}
          initial={"hidden"}
          animate="visible"
          variants={variants}
        />
      ))}
    </>
  );
};
