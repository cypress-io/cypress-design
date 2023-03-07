/// @ts-check
const { defineConfig, defaultTemplates } = require("vue-docgen-cli");
const reactConfig = require("./docgen.config.react.cjs");
const vueConfig = require("./docgen.config.vue.cjs");
const path = require("path");

const { renderTags, mdclean, component } = defaultTemplates;

function lineTemplate(props) {
  let ret = "";

  props.forEach((pr) => {
    const p = pr.name;
    let t = pr.description ?? "";
    t += renderTags(pr.tags);
    const n = pr.type?.name ?? "";
    const d = pr.defaultValue?.value ?? "";

    ret += `| ${mdclean(p)} | ${mdclean(t)} | ${mdclean(n)} | ${mdclean(
      d
    )} |\n`;
  });
  return ret;
}

module.exports = defineConfig({
  componentsRoot: "components/",
  outDir: "./docs/components",
  defaultExamples: true,
  templates: {
    props(props, opt) {
      return `
${opt?.isSubComponent || opt?.hasSubComponents ? "#" : ""}## Props

  | Prop name     | Description | Type      | Default     |
  | ------------- | ----------- | --------- | ----------- |
  ${lineTemplate(props)}
  `;
    },
  },
  pages: [reactConfig, vueConfig],
});
