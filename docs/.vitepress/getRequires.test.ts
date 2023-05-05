import { describe, it, expect } from 'vitest'
import { getRequires } from './getRequires'

describe('getRequires', () => {
  it('should return a string of requires', async () => {
    const code = `
    <script lang="ts" setup>
		import { ref , h} from "vue";
		import Icon, { IconActionQuestionMarkCircle as LocalIcon, IconActionOther as LocalIconOther } from "@cypress-design/vue-icon";
    </script>
		`
    const imports = getRequires(code, 42)
    expect(imports).toMatchInlineSnapshot(`
      "import { ref as __imported_ref_$42__ } from 'vue';
      import { h as __imported_h_$42__ } from 'vue';
      import { IconActionQuestionMarkCircle as __imported_LocalIcon_$42__ } from '../../../components/Icon/vue/index.ts';
      import { IconActionOther as __imported_LocalIconOther_$42__ } from '../../../components/Icon/vue/index.ts';
      import { default as __imported_Icon_$42__ } from '../../../components/Icon/vue/index.ts';

      const imports$42 = {}
      imports$42['vue'] = imports$42['vue'] ?? { __esModule:true, _: {} };imports$42['vue'].ref = __imported_ref_$42__ ;
      imports$42['vue'] = imports$42['vue'] ?? { __esModule:true, _: {} };imports$42['vue'].h = __imported_h_$42__ ;
      imports$42['../../../components/Icon/vue/index.ts'] = imports$42['../../../components/Icon/vue/index.ts'] ?? { __esModule:true, _: {} };imports$42['../../../components/Icon/vue/index.ts'].IconActionQuestionMarkCircle = __imported_LocalIcon_$42__ ;
      imports$42['../../../components/Icon/vue/index.ts'] = imports$42['../../../components/Icon/vue/index.ts'] ?? { __esModule:true, _: {} };imports$42['../../../components/Icon/vue/index.ts'].IconActionOther = __imported_LocalIconOther_$42__ ;
      imports$42['../../../components/Icon/vue/index.ts'] = imports$42['../../../components/Icon/vue/index.ts'] ?? { __esModule:true, _: {} };imports$42['../../../components/Icon/vue/index.ts'].default = __imported_Icon_$42__ ;"
    `)
  })
})
