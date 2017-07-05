import { CHANGE_SEARCH_TERM } from '../actions/searchActions';

export default (state = '', action = {}) => {
  console.log(CHANGE_SEARCH_TERM);
  switch (action.type) {
    case CHANGE_SEARCH_TERM:
      return action.query;
    default:
      return state;
  }
};
