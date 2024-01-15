// @ts-check
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './Typography.module.css'

export const ActionSpan = ({ text, ...props }) => (
  <span
    id={props.id}
    className={cn(styles.action_span, props.className)}
    onClick={props.onClick}
    onMouseEnter={props.onMouseEnter}
    onMouseLeave={props.onMouseLeave}
  >
    {text}
  </span>
)

ActionSpan.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func
}
