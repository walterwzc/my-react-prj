export default (state = [], action) => {
    switch (action.type) {
        case 'ADD_DELETE_ID':
            // console.log(action)
            return [...state, action.payload]
        default:
            return state
    }
}
