export const toggleItem = (id) => {
  return {
    type: 'TOGGLE_ITEM',
    id
  }
}

export const addItem = (id) => {
  return {
    type: 'ADD_ITEM',
    id
  }
}