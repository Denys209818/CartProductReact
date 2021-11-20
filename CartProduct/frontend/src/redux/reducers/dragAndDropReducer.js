
var initialState = {
    isDrag: false
}

const dragAndDropReducer = (state=initialState, action) => 
{
    switch(action.type) 
    {
        case "DRAG_IN": 
        {
            return {
                ...state,
                isDrag: true
            };
        }
        case "DRAG_OUT": 
        {
            return {
                ...state,
                isDrag: false
            };
        }
    }
    return state;
}

export default dragAndDropReducer;