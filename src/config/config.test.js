const { test, describe } = require("node:test");
const assert = require("assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");

const Validator = require("jsonschema").Validator;
const v = new Validator();

describe("Validate config files against schemas", validateSchemas);

async function validateSchemas() {
	const files = await fs.readdir("./src/config");

	// Look for our schema files and collect the filenames/slugs
	const tests = files.reduce((acc, curr) => {
		if (curr.includes(".schema.json")) {
			acc.add(curr.replace(/.json/, "").replace(/.schema/, ""));
		}
		return acc;
	}, new Set());

	// For each schema file, test its corresponding json. Config files without schemas are assumed to be immaculate
	for (let t of tests) {
		test(`JSON validation:  ${t}`, async () => {
			const [data, schema] = await Promise.all([
				fs
					.readFile(`./src/config/${t}.json`, "utf8")
					.then(JSON.parse)
					.catch(e => {
						assert(false, e);
					}),
				fs
					.readFile(`./src/config/${t}.schema.json`, "utf8")
					.then(JSON.parse)
					.catch(e => {
						assert(false, e);
					}),
			]);
			const validation = v.validate(data, schema);

			assert.equal(validation.errors.length, 0, `${t}.json failed validation`);
		});
	}
}
