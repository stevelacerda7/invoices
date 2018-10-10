export default (prevState = {}, action) => {
  switch(action.type) {
    case 'NEW_INVOICE':
      return {
        invoices: prevState.invoices.concat(action.payload),
      }
    default:
      return prevState;
  }
}
