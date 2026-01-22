import { test, describe, expect } from "vitest";
import fs from "node:fs/promises";
import { Validator } from "jsonschema";

const v = new Validator();

describe("Validate config files against schemas", async () => {
	const files = await fs.readdir("./src/config");

	// Look for our schema files and collect the filenames/slugs
	const tests = files.reduce((acc, curr) => {
		if (curr.includes(".schema.json")) {
			acc.add(curr.replace(/.json/, "").replace(/.schema/, ""));
		}
		return acc;
	}, new Set());

	// For each schema file, test its corresponding json
	for (const t of tests) {
		test(`JSON validation: ${t}`, async () => {
			const [data, schema] = await Promise.all([
				fs.readFile(`./src/config/${t}.json`, "utf8").then(JSON.parse),
				fs.readFile(`./src/config/${t}.schema.json`, "utf8").then(JSON.parse),
			]);

			const validation = v.validate(data, schema);
			expect(validation.errors).toHaveLength(0);
		});
	}
});
