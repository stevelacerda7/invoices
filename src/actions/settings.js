import { SAVE_SETTINGS, GET_SETTINGS } from '../constants';

export const saveSettingsAction = () => dispatch => {
  dispatch({
    type: SAVE_SETTINGS,
    payload: null,
  })
};

export const getSettingsAction = (_id) => dispatch => {
  dispatch({
    type: GET_SETTINGS,
    payload: _id,
  })
};
