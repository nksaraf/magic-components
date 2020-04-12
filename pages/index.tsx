import { CSSReset } from "../src";

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
      <CSSReset />
      <row animate={{ x: 100 }}>
        <div>hello world</div>
        <div>hello other world</div>
      </row>
      <row bg="red.100">
        <div>hello world</div>
        <div>hello other world</div>
      </row>
      <stack gap={4}>
        <p
          id="hello"
          css={{
            color: "red.100",
            "&:hover": {
              color: "green.100",
            },
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
          animate={state ? "open" : "close"}
        >
          Hello World Ne Iadsadw
        </div>
      </stack>
      <div color="red.100" whileHover={{ x: "100px" }} id="hello">
        Hello World Ne Iadsadw
      </div>
      <button onTap={() => setState((s) => !s)}>Click me</button>
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
