import * as path from "https://deno.land/std/path/mod.ts";
import * as fs from "https://deno.land/std/fs/mod.ts";

let all = '';

for (var file of fs.expandGlobSync('./babel/magic/configs/*.ts')) {
  all += fs.readFileStrSync(file.filename) + '\n\n';
}

fs.writeFileStrSync('./all.ts',  all);