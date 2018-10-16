import { SAVE_CLIENT, GET_ALL_CLIENTS, GET_CLIENT, DELETE_CLIENT } from '../constants';

export default (prevState = {}, action) => {
  switch(action.type) {
    case SAVE_CLIENT:
      // save to db
      console.log('saved client');
      window.location = '/clients';
      return prevState;
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
          status: 'active',
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
        {
          id: '10002',
          clientName: 'John Smith',
          clientEmail: 'johnsmith@booboo.com',
          clientAddress: '123 Boo St, San Jose, CA 95645',
          defaultCurrency: 'USD',
          defaultLanguage: 'English',
          creditCard: '1234123412341234',
          status: 'deleted',
          invoices: [
            {
              id: '001',
              clientName: 'John Smith',
              clientEmail: 'johnsmith@booboo.com',
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
              clientName: 'John Smith',
              clientEmail: 'johnsmith@booboo.com',
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
      console.log('deleted client');
      window.location = '/clients';
      return prevState;
    default:
      return prevState;
  }
}
