import React from 'react'

const Notification = ({ notificationMessage, notificationError }) => {
  if (notificationMessage === null) {
    return null
  }

  return (
    <div className={notificationError ? 'red-noti' : 'green-noti'}>
      {notificationMessage}
    </div>
  )
}

export default Notification