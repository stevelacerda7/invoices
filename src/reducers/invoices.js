import { SAVE_INVOICE, GET_ALL_INVOICES, GET_INVOICE, DELETE_INVOICE } from '../constants';

export default (prevState = {}, action) => {
  switch(action.type) {
    case SAVE_INVOICE:
      return {
        invoices: prevState.invoices.concat(action.payload),
      }
    case GET_ALL_INVOICES:
      return [
        {
          id: '001',
          clientId: '10001',
          clientName: 'Joe Smith',
          clientEmail: 'jsmith@booboo.com',
          total: "55.00",
          currencyType: 'USD',
          status: 'Paid',
          notes: "test notes",
          discount: "20.50",
          sendDate: '10/2/18',
          createdOn: '10/1/18',
          salesTaxId: '12345',
          salesTax: '10.00',
          secondTaxId: '56789',
          secondTax: '2.00',
          items: [
            {
              id: 1,
              description: 'asdf',
              amount: 35.00,
              quantity: 1,
            },
            {
              id: 2,
              description: 'test',
              amount: 20.00,
              quantity: 1,
            }
          ]
        }
      ];
    case GET_INVOICE:

      return;
    case DELETE_INVOICE:

      return;
    default:
      return prevState;
  }
}
