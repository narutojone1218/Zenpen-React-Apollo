export const ADD_ALERT = 'alerts.ADD_ALERT'
export const REMOVE_ALERT = 'alerts.REMOVE_ALERT'
export const CLEAR_ALERTS = 'alerts.CLEAR_ALERTS'

export const addAlert = (alertType, message) => ({
  type: ADD_ALERT,
  alert: {
    alertType,
    message,
  },
})

export const removeAlert = id => ({
  type: REMOVE_ALERT,
  id,
})

export const clearAlerts = () => ({
  type: CLEAR_ALERTS,
})

