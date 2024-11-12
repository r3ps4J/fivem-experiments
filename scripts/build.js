const { build } = require("esbuild");
const fs = require("fs");

const resources = fs.readdirSync("./resources")

for (const resource of resources) {
    if (!fs.existsSync(`./resources/${resource}/package.json`)) {
        continue;
    }

    console.log(`Building resource '${resource}'`);

    build({
        bundle: true,
        entryPoints: [`./resources/${resource}/src/main.ts`],
        outfile: `./resources/${resource}/dist/main.js`,
        logLevel: "info",
        platform: "node",
    });
}
