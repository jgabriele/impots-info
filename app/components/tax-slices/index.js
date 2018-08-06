import React from 'react'
import injectSheet from 'react-jss'
import LinearProgress from '@material-ui/core/LinearProgress'

import styles from './styles'

const colors = ['blue', 'green', 'pink', 'grey']
const proportions = [1, 3, 8, 16]

const TaxSlices = ({ classes, slices }) => {
  return (
    <div className={classes.sliceWrapper}>
      {
        slices.map((slice, index) =>
          <div
            key={index}
            title={`${slice.value} (${slice.taxPercentage}% de la tranche à ${slice.percentage * 100}% ${slice.from}-${slice.to})`}
            className={classes.slice}
            style={{ background: `light${colors[index]}`, flex: proportions[index] }}
          >
            <div className={classes.progress} style={{ transform: `scaleX(${slice.taxPercentage / 100 || 0})`, background: colors[index] }}></div>
          </div>
        )
      }
    </div>
  )
}

export default injectSheet(styles)(TaxSlices)
