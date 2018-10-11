import { SAVE_INVOICE, GET_ALL_INVOICES, GET_INVOICE, DELETE_INVOICE } from '../constants';

export const saveInvoiceAction = (invoice) => dispatch => {
  dispatch({
    type: SAVE_INVOICE,
    payload: invoice
  })
};

export const getAllInvoicesAction = () => dispatch => {
  dispatch({
    type: GET_ALL_INVOICES,
    payload: null,
  })
};

export const getInvoiceAction = (id) => dispatch => {
  dispatch({
    type: GET_INVOICE,
    payload: id,
  })
};

export const deleteInvoiceAction = (id) => dispatch => {
  dispatch({
    type: DELETE_INVOICE,
    payload: id,
  })
};
