const { test, describe } = require("node:test");
const assert = require("assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");

const Validator = require("jsonschema").Validator;
const v = new Validator();
// var instance = 4;
// var schema = { type: "number" };
// console.log(v.validate(instance, schema));

describe("Validate config files against schemas", validateSchemas);

async function validateSchemas() {
	const files = await fs.readdir("./src/config");
	const tests = files.reduce((acc, curr) => {
		if (path.extname(curr) === ".json") {
			acc.add(curr.replace(/.json/, "").replace(/.schema/, ""));
		}
		return acc;
	}, new Set());

	for (let t of tests) {
		test(`JSON validation:  ${t}`, async () => {
			const [data, schema] = await Promise.all([
				fs
					.readFile(`./src/config/${t}.json`, "utf8")
					.then(JSON.parse)
					.catch(console.error),
				fs
					.readFile(`./src/config/${t}.schema.json`, "utf8")
					.then(JSON.parse)
					.catch(console.error),
			]);
			const validation = v.validate(data, schema);

			assert.equal(validation.errors.length, 0, `${t}.json failed validation`);
		});
	}
}
