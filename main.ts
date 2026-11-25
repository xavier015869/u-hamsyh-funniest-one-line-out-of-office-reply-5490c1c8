// Funniest One-Line Out-of-Office Reply
// u-hamsyh-funniest-one-line-out-of-office-reply-5490c1c8
//
// Writes a single out-of-office auto-reply line to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt). The line must be 1-160 UTF-8
// characters, a single line, and read like a real away message a person
// would actually switch on.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I'm out of office until Monday. My inbox is being handled by my cat, who has approved everything, replied to nothing, and deleted the evidence.";

function main(): void {
  // Gate guard: the sealed scorer rejects anything outside 1-160 chars
  // or anything that is not a single non-blank line. Fail loudly here
  // instead of shipping an invalid entry.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 160) {
    throw new Error(`entry is ${chars} characters, must be 1-160`);
  }
  if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
    throw new Error("entry must be a single non-blank line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
