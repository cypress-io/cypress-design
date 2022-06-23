import dedent from 'dedent'
import Alert from './Alert.vue'

export default () => (
  <div class="flex flex-col p-4 gap-16px">
    <Alert type="error" detailsTitle="Stack Trace">
      {{
        default: () => 'Spec not found',
        body: () => (
          <>
            There is no spec matching the following location: path/to/spec.cy.js
            <br />
            <br />
            It is possible that the file has since been moved or deleted. Please
            choose from the list of specs below
          </>
        ),
        details: () => (
          <pre class="bg-white rounded border border-red-500 px-16px py-8px">
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
    <Alert type="success" dismissible>
      {{
        default: () => 'Success with body',
        body: () => 'Success body',
      }}
    </Alert>
    <Alert type="warning" not-rounded>
      Warning
    </Alert>
    <Alert type="error" dismissible class="text-justify">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Alert>
    <Alert type="info">Info</Alert>
  </div>
)
