export const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM';

export function changeQuery(query) {
  return { type: CHANGE_SEARCH_TERM, query };
}
