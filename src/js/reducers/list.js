const food = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        key: action.id.row,
        name: action.id.item_name,
        type: action.id.category,
        calorie: action.id.calories,
        protein:action.id.protein,
        carbs:action.id.carbs,
        fat:action.id.fat,
        button:action.id.button,
        dhall:action.id.dhall,
        meal:action.id.meal,
        ingredients:action.id.ingredients,
        allergens:action.id.allergens
      }
    case 'TOGGLE_ITEM':
      if (state.key !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        button: !state.button
      })
    default:
      return state
  }
}

const foodList = (state = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [
        ...state,
        food(undefined, action)
      ]
    case 'TOGGLE_ITEM':
      return state.map(t =>
        food(t, action))
    default:
      return state
  }
}

export default foodList