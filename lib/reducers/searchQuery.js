import { CHANGE_SEARCH_TERM } from '../actions/searchActions';

export default (state = '', action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_TERM:
      return action.query;
    default:
      return state;
  }
};
