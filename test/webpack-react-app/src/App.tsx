
import * as React from 'react';
import { hot } from "react-hot-loader/root";
import Checkbox from '@cypress-design/react-checkbox'

interface Props {
   name:
    string
}

class App extends React.Component<Props> {
  render() {
    const { name } = this.props;
    return (
      <>
        <h1>
          Hello {name}
        </h1>
        <Checkbox onChange={() => console.log('Checkbox changed')} label="Sample Checkbox"/>
      </>
    );
  }
}

export default hot(App);
