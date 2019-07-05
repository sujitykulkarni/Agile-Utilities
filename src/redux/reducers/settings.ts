import { SET_MAN_HOURS, TOGGLE_MAN_HOURS } from 'redux/actions/actionTypes';
interface IAction {
    type: string;
    payload: any;
} 
const initialState = {
    manHours: {
        hours: 7,
        minutes: 30,
    },
    enableManHours: true,
}

export default (state = initialState, action: IAction) => {
    switch(action.type) {
        case SET_MAN_HOURS: {
            const manHours = action.payload;
            return {
                ...state,
                manHours,
            }
        }

        case TOGGLE_MAN_HOURS: {
            return {
                ...state,
                enableManHours: action.payload,
            }
        }

        default:
            return state;
    }
}