import './motion.scss'

import React from 'react'

export class Motion extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Motion</h1>

        <p>
          Motion is used to inform users about changes to the state of the UI.
          It can help teach users about the mechanics of the page ("the
          navigation slides in from the right"). It is an <em>extremely</em>{' '}
          effective tool for focusing user attention, and thus should be used
          sparingly.
        </p>

        <hr />

        <h5>Cubic easing, 200ms</h5>
        <div className="motion-example motion-example--cubic">
          <span className="motion-example--target" />
        </div>
        <p>Good for "snappy" motions, like drawers or menus opening.</p>

        <h5>ease-in-out easing, 400ms</h5>
        <div className="motion-example motion-example--ease">
          <span className="motion-example--target" />
        </div>
        <p>Good for "graceful" motions, like text fading in and out.</p>
      </div>
    )
  }
}
