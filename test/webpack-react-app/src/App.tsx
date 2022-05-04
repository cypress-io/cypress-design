import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Checkbox from '@cypress-design/react-checkbox';

interface Props {
  name: string;
}

const App: FunctionComponent<Props> = ({ name }) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <h1>Hello {name}</h1>
      <Checkbox
        label="Sample"
        checked={isChecked}
        onChange={() => setChecked(!isChecked)}
        modelValue={isChecked}
      />
    </>
  );
};

export default hot(App);
