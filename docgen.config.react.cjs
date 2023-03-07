/// @ts-check
const { defineConfig } = require("vue-docgen-cli");
const { parse } = require("react-docgen-typescript");
const path = require("path");

module.exports = defineConfig({
	components: "./*/react/[A-Z]*.@(tsx|ts)",
	getDestFile: (componentPath, { outDir }) => {
		const name = componentPath.split("/").pop() || "unknown";
		return path.join(outDir, "react", name.replace(/\.(tsx|ts)$/, ".md"));
	},
	propsParser(componentPath) {
		const props = parse(componentPath, {});
		const propsAdapted = props.map((p) => {
			/** @type import('vue-docgen-api').ComponentDoc */
			const mp = {
				displayName: p.displayName,
				props: Object.entries(p.props).reduce((
					/** @type NonNullable<import('vue-docgen-api').ComponentDoc['props']> */
					acc, [pkey, pp]) => {
					if(/node_modules/.test(pp.parent?.fileName || '')){
						return acc
					}
					/** @type NonNullable<import('vue-docgen-api').ComponentDoc['props']>[number] */
					const propType = {
						name: pkey,
						description: pp.description,
						type: pp.type,
						defaultValue: pp.defaultValue,
					};
					acc.push(propType);
					return acc;
				}, 
				[]),
				exportName: p.displayName,
				tags: Object.entries(p.tags || {}).reduce((acc, [k, v]) => {
					acc[k] = [{ title: k, content: v }];
					return acc;
				}, {}),
			};
			return mp;
		});
		return Promise.resolve(propsAdapted);
	},
})