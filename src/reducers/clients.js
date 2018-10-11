import { SAVE_CLIENT, GET_ALL_CLIENTS, GET_CLIENT, DELETE_CLIENT } from '../constants';

export default (prevState = {}, action) => {
  switch(action.type) {
    case SAVE_CLIENT:
      // save to db
      break;
    case GET_ALL_CLIENTS:
      return [
        {
          id: '10001',
          clientName: 'Joe Smith',
          clientEmail: 'jsmith@booboo.com',
          clientAddress: '123 Boo St, San Jose, CA 95645',
          defaultCurrency: 'USD',
          defaultLanguage: 'English',
          creditCard: '',
          invoices: [
            {
              id: '001',
              clientName: 'Joe Smith',
              clientEmail: 'jsmith@booboo.com',
              total: 35.00,
              currencyType: 'USD',
              status: 'Paid',
              sendDate: '10/2/18',
              createdOn: '10/1/18',
              items: [
                {
                  id: 1,
                  description: 'asdf',
                  currentType: 'USD',
                  amount: 35.00,
                  quantity: 1,
                },
                {
                  id: 2,
                  description: 'test',
                  currentType: 'USD',
                  amount: 20.00,
                  quantity: 1,
                }
              ]
            },
            {
              id: '002',
              clientName: 'Joe Smith',
              clientEmail: 'jsmith@booboo.com',
              total: 35.00,
              currencyType: 'USD',
              status: 'Unpaid',
              sendDate: '10/2/18',
              createdOn: '10/1/18',
              items: [
                {
                  id: 1,
                  description: 'asdf',
                  currentType: 'USD',
                  amount: 35.00,
                  quantity: 1,
                },
                {
                  id: 2,
                  description: 'test',
                  currentType: 'USD',
                  amount: 20.00,
                  quantity: 1,
                }
              ]
            }
          ]
        },
      ]
    case GET_CLIENT:
      return prevState.find(client => client.id === action.payload);
    case DELETE_CLIENT:
      let index = prevState.findIndex(client => client.id === action.payload);
      return {
        ...prevState,
        clients: [...prevState.clients.slice(0, index), ...prevState.slice(index + 1)],
      }
    default:
      return prevState;
  }
}
