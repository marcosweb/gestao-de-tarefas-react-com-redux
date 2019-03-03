import axios from 'axios'

const url = 'http://localhost:3003/api/todo'

const setDone = (todo, done = true) => {
  return dispatch => {
    axios.put(`${url}/${todo._id}`, { done })
    .then(() => {
      dispatch(search())      
    })
  }
}

export const clearSearch = () => {
  return [{ type: 'TASK_CLEAR' }, search()] // middleware 'multi'
}

export const changeTask = event => ({
  type: 'TASK_CHANGED',
  payload: event.target.value
})

export const search = () => { 
  return (dispatch, getState) => { // middleware 'thunk'
    const description = getState().todo.description
    const _search = description ? `&description__regex=/${description}/` : ''
    axios.get(`${url}?sort=-createdAt${_search}`).then(resp => {
      return dispatch({
        type: 'TASK_SEARCHED',
        payload: resp.data
      })
    })
  }
}

export const add = description => {
  return dispatch => { // middleware 'thunk'
    axios.post(url, { description })
    .then(() => {
      dispatch({ type: 'TASK_CLEAR' })
    })
    .finally(resp => {
      dispatch(search())
    })
  }
}

export const del = todo => {
  return dispatch => { // middleware 'thunk'
    axios.delete(`${url}/${todo._id}`)
    .then(() => {
      dispatch(search())  
    })
  }
}

export const done = todo => {
  return setDone(todo)
}

export const pending = todo => {
  return setDone(todo, false)
}
