import Alert from './Alert.vue'

export default () => (
  <div class="flex flex-col p-4 gap-16px">
    <Alert type="error">
      {{
        default: () => 'Error with body',
        body: () => (
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        ),
        details: () => (
          <div>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget lacinia odio sem nec elit. Donec ullamcorper nulla non metus
            auctor fringilla. Fusce dapibus, tellus ac cursus commodo, tortor
            mauris condimentum nibh, ut fermentum massa justo sit amet risus.
          </div>
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
