# magic-components

```javascript
import React from "react";
import { render } from "react-dom";
import "magic-components";

function App() {
  return (
    <stack mx={4} my={6} gap={3} align="center">
      <div
        bg="red.100"
        p={3}
        whileHover={{
          cursor: "pointer",
          backgroundColor: "green.100",
          scale: 1.1
        }}
      >
        Magic
      </div>
      <div
        bg="green.100"
        p={3}
        whileHover={{
          bgColor: "amber.100",
          cursor: "pointer",
          rotateZ: "-35deg"
        }}
      >
        More Magic
      </div>
    </stack>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
```