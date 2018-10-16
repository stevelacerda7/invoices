import { SAVE_SETTINGS, GET_SETTINGS } from '../constants';

export default (prevState = {}, action) => {
  switch(action.type) {
    case SAVE_SETTINGS:
      return prevState;
    case GET_SETTINGS:
      return prevState;
    default:
      return prevState;
  }
}
