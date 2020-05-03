import { magic } from "./magic";
import { domElements } from "./elements";

domElements.forEach((el) => {
  // @ts-ignore
  magic[el as any] = magic.custom(el);
});
