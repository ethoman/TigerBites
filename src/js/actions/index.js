export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const filterTodo = (id) => {
  return {
    type: 'FILTER_TODO',
    id
  }
}

export const addTodo = (id) => {
  return {
    type: 'ADD_TODO',
    id
  }
}