import { Global } from "magic-components";

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
      <Global style={{ body: { margin: "0px" } }} />
      <div color="red.100" whileHover={{ x: "100px" }} id="hello">
        Hello World Ne Iadsadw
      </div>
      <p id="hello">Hello World Ne Iadsadw</p>
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
