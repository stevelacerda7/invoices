const NEW_INVOICE = "ADD_INVOICE";
// const DELETE_INVOICE = "DELETE_INVOICE";
// const ADD_ITEM = "ADD_ITEM";

export const newInvoiceAction = (invoice) => dispatch => {
  dispatch({
    type: NEW_INVOICE,
    payload: invoice
  })
}
