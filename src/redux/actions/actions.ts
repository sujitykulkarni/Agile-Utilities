import * as ACTIONS from './actionTypes';
export const setManHours = (manHours: {hours: number, minutes: number}) => ({
    type: ACTIONS.SET_MAN_HOURS,
    payload: manHours,
});

export const toggleManHours = (flag: boolean) => ({
    type: ACTIONS.TOGGLE_MAN_HOURS,
    payload: flag,
})