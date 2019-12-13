import React from 'react'
import { connect } from 'react-redux'
//import notificationReducer from '../reducers/notificationReducer'

const Notification = (props) => {
  const notification = props.notification
  console.log(notification.visible)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.visible ? 'block' : 'none'
  }
  return (
    <div style={style}>
      {notification.text}
    </div>
  )
}

const mapStateToProps = (state) => {
  // joskus on hyödyllistä tulostaa mapStateToProps:ista...
  console.log(state)
  return {
      notification: state.notification
  }
}


const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification