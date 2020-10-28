import { LOAD_WISHES } from '../reducers/wishReducer';
import { WISHES_FETCH_FAIL } from '../reducers/errorReducer';

export const fetchWishes = id => {
  return async dispatch => {
    const res = await fetch(`http://localhost:8000/api/users/${id}/wishes`);

    if (res.ok) {
      const { wishes } = await res.json();
      return dispatch({
        type: LOAD_WISHES,
        wishes
      });
    }
    
    dispatch({ type: WISHES_FETCH_FAIL });
  }
};