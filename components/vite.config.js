import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// TODO: only load plugins below when it's a vue file

export default {
  plugins: [vue(), vueJsx()],
};
