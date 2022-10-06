export const initialState = JSON.parse(localStorage.getItem("user"));

export const reducer = (state, action) => {
    if (action.type === "USER") {
        return action.payload;
    }
    
    if (action.type === "LOGOUT") {
        return null;
    }

    if (action.type === "UPDATE") {
        return {
            ...state,
           name: action.payload.name,
           phone:action.payload.phone,
           address:action.payload.address
        }
    }


    return state;
}