---
to: components/<%= h.inflection.camelize(name, false) %>/vue/<%= h.inflection.camelize(name, false) %>.stories.tsx
---
import <%= h.inflection.camelize(name, false) %> from './<%= h.inflection.camelize(name, false) %>.vue';

export default {
  title: '<%= h.inflection.camelize(name, false) %>',
  component: <%= h.inflection.camelize(name, false) %>,
};

export const Sample = () => (
  <div class="p-4">
    <<%= h.inflection.camelize(name, false) %> label="Sample" id="sample" />
  </div>
);
