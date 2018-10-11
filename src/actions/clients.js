import { SAVE_CLIENT, GET_ALL_CLIENTS, GET_CLIENT, DELETE_CLIENT } from '../constants';

export const saveClientAction = (client) => dispatch => {
  dispatch({
    type: SAVE_CLIENT,
    payload: client
  })
};

export const getAllClientsAction = () => dispatch => {
  dispatch({
    type: GET_ALL_CLIENTS,
    payload: null,
  })
};

export const getClientAction = (id) => dispatch => {
  dispatch({
    type: GET_CLIENT,
    payload: id,
  })
};

export const deleteClientAction = (id) => dispatch => {
  dispatch({
    type: DELETE_CLIENT,
    payload: id,
  })
};
