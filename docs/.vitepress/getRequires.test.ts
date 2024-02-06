import { describe, it, expect } from 'vitest'
import { getRequires } from './getRequires'

describe('getRequires', () => {
  it('should return a string of requires', async () => {
    const code = `
    <script lang="ts" setup>
		import { merge } from "lodash";
		import { ref , h} from "vue";
		import Icon, { IconActionQuestionMarkCircle as LocalIcon, IconActionOther as LocalIconOther } from "@cypress-design/vue-icon";
    </script>
		`
    const imports = getRequires(
      code,
      42,
      ['Icon'],
      'components/vue/Accordion.md',
      false,
    )
    expect(imports).toMatchInlineSnapshot(`
      "import { merge as __imported_merge_$42__ } from 'lodash';
      import { IconActionQuestionMarkCircle as __imported_LocalIcon_$42__ } from '../../../components/Icon/vue/index.ts';
      import { IconActionOther as __imported_LocalIconOther_$42__ } from '../../../components/Icon/vue/index.ts';
      import { default as __imported_Icon_$42__ } from '../../../components/Icon/vue/index.ts';

      const imports$42 = {};
      imports$42['lodash'] = imports$42['lodash'] ?? { __esModule:true, _: {} };imports$42['lodash'].merge = __imported_merge_$42__ ;
      imports$42['@cypress-design/vue-icon'] = imports$42['@cypress-design/vue-icon'] ?? { __esModule:true, _: {} };imports$42['@cypress-design/vue-icon'].IconActionQuestionMarkCircle = __imported_LocalIcon_$42__ ;
      imports$42['@cypress-design/vue-icon'] = imports$42['@cypress-design/vue-icon'] ?? { __esModule:true, _: {} };imports$42['@cypress-design/vue-icon'].IconActionOther = __imported_LocalIconOther_$42__ ;
      imports$42['@cypress-design/vue-icon'] = imports$42['@cypress-design/vue-icon'] ?? { __esModule:true, _: {} };imports$42['@cypress-design/vue-icon'].default = __imported_Icon_$42__ ;"
    `)
  })

  it('should return a string of requires in production', async () => {
    const code = `
    <script lang="ts" setup>
		import { merge } from "lodash";
		import { ref , h} from "vue";
		import Icon, { IconActionQuestionMarkCircle as LocalIcon, IconActionOther as LocalIconOther } from "@cypress-design/vue-icon";
    </script>
		`
    const imports = getRequires(
      code,
      42,
      ['Icon'],
      'components/vue/Accordion.md',
      true,
    )
    expect(imports).toMatchInlineSnapshot(`
      "import { merge as __imported_merge_$42__ } from 'lodash';
      import { IconActionQuestionMarkCircle as __imported_LocalIcon_$42__ } from '@cypress-design/vue-icon';
      import { IconActionOther as __imported_LocalIconOther_$42__ } from '@cypress-design/vue-icon';
      import { default as __imported_Icon_$42__ } from '@cypress-design/vue-icon';

      const imports$42 = {};
      imports$42['lodash'] = imports$42['lodash'] ?? { __esModule:true, _: {} };imports$42['lodash'].merge = __imported_merge_$42__ ;
      imports$42['@cypress-design/vue-icon'] = imports$42['@cypress-design/vue-icon'] ?? { __esModule:true, _: {} };imports$42['@cypress-design/vue-icon'].IconActionQuestionMarkCircle = __imported_LocalIcon_$42__ ;
      imports$42['@cypress-design/vue-icon'] = imports$42['@cypress-design/vue-icon'] ?? { __esModule:true, _: {} };imports$42['@cypress-design/vue-icon'].IconActionOther = __imported_LocalIconOther_$42__ ;
      imports$42['@cypress-design/vue-icon'] = imports$42['@cypress-design/vue-icon'] ?? { __esModule:true, _: {} };imports$42['@cypress-design/vue-icon'].default = __imported_Icon_$42__ ;"
    `)
  })
})
