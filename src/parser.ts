import { system } from "./system";
import { allConfig } from "./style-config";

export const strictCssParser = system(allConfig, "separate");

export const linientCssParser = system(allConfig, "merge", false);
