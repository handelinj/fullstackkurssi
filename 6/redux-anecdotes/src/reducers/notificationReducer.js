const initialState = {
    text: '',
    visible: false
}

const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
      case 'SET':
        return { 
            text: action.data.text,
            visible: true
        }
      case 'REMOVE':
        return {
            text: '',
            visible: false
        }
      default: return state
    }
}

export const setText = (text,time)  => {
  return async dispatch => {
    dispatch({
      type: 'SET',
      data: {
        text
      },
    })
    setTimeout( () =>
    dispatch({
      type: 'REMOVE',
      data: {
      },
    }), 1000*time)
  }
}



export default notificationReducer