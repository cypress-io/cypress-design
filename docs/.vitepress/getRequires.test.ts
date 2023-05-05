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
    const imports = getRequires(code, 42, ['Icon'], false)
    expect(imports).toMatchInlineSnapshot(`
      "import { ref as __imported_ref_$42__ } from 'vue';
      import { h as __imported_h_$42__ } from 'vue';

      const imports$42 = {};
      imports$42['vue'] = imports$42['vue'] ?? { __esModule:true, _: {} };imports$42['vue'].ref = __imported_ref_$42__ ;
      imports$42['vue'] = imports$42['vue'] ?? { __esModule:true, _: {} };imports$42['vue'].h = __imported_h_$42__ ;"
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
    const imports = getRequires(code, 42, ['Icon'], true)
    expect(imports).toMatchInlineSnapshot(`
      "import { ref as __imported_ref_$42__ } from 'vue';
      import { h as __imported_h_$42__ } from 'vue';

      const imports$42 = {};
      imports$42['vue'] = imports$42['vue'] ?? { __esModule:true, _: {} };imports$42['vue'].ref = __imported_ref_$42__ ;
      imports$42['vue'] = imports$42['vue'] ?? { __esModule:true, _: {} };imports$42['vue'].h = __imported_h_$42__ ;"
    `)
  })
})
