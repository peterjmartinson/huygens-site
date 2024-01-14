import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './Layout.module.css'

const PageContainer = ({ className, children }) => (
  <div className={cn(styles.page_container, className)}>
    {children}
  </div>
)

const MainContainer = ({ className, children }) => (
  <div className={cn(styles.main_container, className)}>
    {children}
  </div>
)

const ContentContainer = ({ className, children }) => (
  <div className={cn(styles.content_container, className)}>
    {children}
  </div>
)

// all containers will have the same two proptypes
const containerPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
}

PageContainer.propTypes = { ...containerPropTypes }
MainContainer.propTypes = { ...containerPropTypes }
ContentContainer.propTypes = { ...containerPropTypes }

export {
  ContentContainer,
  MainContainer,
  PageContainer
}
