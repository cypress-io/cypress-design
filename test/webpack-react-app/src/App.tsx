import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Checkbox from '@cypress-design/react-checkbox';
import Icon from '@cypress-design/react-icon';
import Spinner from '@cypress-design/react-spinner';

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
      <Icon name="object-book-code" fillColor="red-300" strokeColor="green-600" />
      {/* <IconCircleBgQuestionMark stroke-color="indigo-500" /> */}
      <Icon
        name="object-box-open"
        fillColor="indigo-500"
        strokeColor="indigo-500"
        secondaryFillColor="red-500"
        secondaryStrokeColor="red-500"
        size="48"
      />
      <Spinner />
    </>
  );
};

export default hot(App);
