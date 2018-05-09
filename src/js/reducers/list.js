const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      //console.log(action);
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
        meal:action.id.meal
      }
    case 'TOGGLE_TODO':
      //console.log(action);
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

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
    //console.log(action)
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action))
    case 'FILTER_TODO':
      console.log(action);
      return state.filter(function(item){
         const itemData = item.name.toUpperCase()
         const textData = action.id.toUpperCase()
         return itemData.indexOf(textData) > -1
       }
      )
    default:
      return state
  }
}

export default todos