import { ContentLoader, palette } from '@frontend/design-system'
import React, { Component } from 'react'

export class LoaderGraph extends Component {
  render() {
    return (
      <div className="graph-loader-holder">
        <ContentLoader
          height={28}
          width={220}
          speed={2}
          primaryColor={palette.gray50}
          secondaryColor={palette.gray100}
        >
          <rect x="0" y="8" rx="0" ry="0" width="200" height="15" />
        </ContentLoader>
      </div>
    )
  }
}
