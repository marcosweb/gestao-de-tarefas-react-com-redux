const initialState = { description: '', list: [] }

export default (state = initialState, action) => {
  const ret = {
    TASK_CHANGED: { ...state, description: action.payload },
    TASK_SEARCHED: { ...state, list: action.payload },
    TASK_CLEAR: { ...state, description: '' }
  }
  return ret[action.type] || state;
}
