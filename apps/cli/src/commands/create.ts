import { isAbsolute, join } from "path";
import { ArgumentsCamelCase, Argv } from "yargs";
import * as process from "node:process";
import { logger } from "@/logger";
import { bold, green, red } from "picocolors";
import { downloadTemplate } from "giget";

interface CreateArgv {
  path: string;
}

export const command = "create <path>";
export const describe = "Create new project based on `cli-typescript-starter`.";
export const aliases = ["c"];

export function builder(yargs: Argv<CreateArgv>): Argv {
  return yargs
    .positional("path", {
      type: "string",
      description: "path to working directory",
      default: "cli-typescript-starter",
    })
    .coerce("path", (value: string) => {
      if (isAbsolute(value)) {
        return value;
      }
      return join(process.cwd(), value);
    });
}

export async function handler(argv: ArgumentsCamelCase<CreateArgv>) {
  const ready = await logger.prompt(
    green(`Are you ready to create new project at ${argv.path} folder?`),
    {
      type: "confirm",
    },
  );
  if (ready) {
    try {
      await downloadTemplate("gh:kucherenko/cli-typescript-starter", {
        dir: argv.path,
      });
      logger.box(
        green(
          `The cli project created at ${bold(argv.path)} folder.\n Go to the folder and run ${bold("pnpm install")} to start!\n Enjoy your coding!`,
        ),
      );
    } catch (e) {
      logger.error(red((e as Error).message));
    }
  }
}
