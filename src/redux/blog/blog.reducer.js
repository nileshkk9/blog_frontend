const INITIAL_STATE = {
    blogs: []
}
const blogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_BLOG":
            return {
                ...state,
                blogs: action.payload
            }
        default:
            return state;
    }
}

export default blogReducer;