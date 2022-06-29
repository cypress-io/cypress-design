import { IconArrowRight } from '@cypress-design/vue-icon'
import dedent from 'dedent'
import { ref } from 'vue'
import Alert from './Alert.vue'

export default (() => ({
  setup() {
    const displayTimedAlert = ref(false)
    return () => (
      <div class="flex flex-col p-4 gap-16px">
        <Alert type="error" detailsTitle="Stack trace" data-cy="alert-1">
          {{
            default: () => 'Spec not found',
            body: () => (
              <>
                There is no spec matching the following location:
                <code class="bg-red-100 m-8px rounded px-2px">
                  path/to/spec.cy.js
                </code>
                <br />
                <br />
                It is possible that the file has since been moved or deleted.
                Please choose from the list of specs below
              </>
            ),
            details: () => (
              <pre class="bg-white rounded border border-red-500 px-16px py-8px overflow-x-auto">
                {dedent`Uncaught Error: Error occurred in defineConfig()
            Trace: add called with  2 and 3
                at sum (/home/dev/Documents/stacktrace.js:2:13)
                at start (/home/dev/Documents/stacktrace.js:11:13)
                at Object. (/home/dev/Documents/stacktrace.js:16:1)
                at Module._compile (internal/modules/cjs/loader.js:959:30)
                at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
                at Module.load (internal/modules/cjs/loader.js:815:32)
                at Function.Module._load (internal/modules/cjs/loader.js:727:14)
                at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
                at internal/main/run_main_module.js:17:11
            Trace: add called with  8 and 11
                at sum (/home/dev/Documents/stacktrace.js:2:13)
                at calc (/home/dev/Documents/stacktrace.js:7:12)
                at start (/home/dev/Documents/stacktrace.js:12:13)
                at Object. (/home/dev/Documents/stacktrace.js:16:1)
                at Module._compile (internal/modules/cjs/loader.js:959:30)
                at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
                at Module.load (internal/modules/cjs/loader.js:815:32)
                at Function.Module._load (internal/modules/cjs/loader.js:727:14)
                at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
                at internal/main/run_main_module.js:17:11
            Trace: add called with  9 and 14
                at sum (/home/dev/Documents/stacktrace.js:2:13)
                at calc (/home/dev/Documents/stacktrace.js:7:25)
                at start (/home/dev/Documents/stacktrace.js:12:13)
                at Object. (/home/dev/Documents/stacktrace.js:16:1)
                at Module._compile (internal/modules/cjs/loader.js:959:30)
                at Object.Module._extensions..js (internal/modules/cjs/loader.js:995:10)
                at Module.load (internal/modules/cjs/loader.js:815:32)
                at Function.Module._load (internal/modules/cjs/loader.js:727:14)
                at Function.Module.runMain (internal/modules/cjs/loader.js:1047:10)
                at internal/main/run_main_module.js:17:11`}
              </pre>
            ),
          }}
        </Alert>
        <button
          class="border rounded p-8px"
          onClick={() => (displayTimedAlert.value = true)}
        >
          open alert for 5 seconds
        </button>
        {displayTimedAlert.value && (
          <Alert
            duration={5000}
            onDismiss={() => (displayTimedAlert.value = false)}
            dismissible
            data-cy="alert-2"
          >
            Wait 5 seconds please
          </Alert>
        )}
        <Alert type="success" dismissible data-cy="alert-3">
          {{
            default: () => 'Success with body',
            body: () => 'Success body',
          }}
        </Alert>
        <Alert type="warning" not-rounded>
          Warning
        </Alert>
        <Alert type="neutral">Neutral</Alert>
        <Alert type="error" dismissible class="text-justify" data-cy="alert-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Alert>
        <Alert type="info">Info</Alert>
        <Alert type="info">
          {{
            default: () => 'Info',
            icon: (props: any) => <IconArrowRight {...props} />,
          }}
        </Alert>
      </div>
    )
  },
}))()
