/*
FETCHING ACTIONS
Components - InitRoom 
*/

export const isFetching = (isFetching) => {
  return {
    type: 'FETCH',
    isFetching
  }
}
