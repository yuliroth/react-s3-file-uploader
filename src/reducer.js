import { fromJS } from 'immutable';
import { UPLOAD_IN_PROGRESS, UPLOAD_ERROR, UPLOAD_FINISHED, INITIAL } from './constants';

const initialState = fromJS({
  imageUrl: '',
  currentState: INITIAL,
});

export default function(state = initialState, action = {}) {
  switch (action.type) {
    case UPLOAD_FINISHED:
      return state.set('imageUrl', action.imageUrl)
        .set('currentState', UPLOAD_FINISHED)
        .set('error', null);
    case UPLOAD_IN_PROGRESS:
      return state.set('currentState', UPLOAD_IN_PROGRESS);
    case UPLOAD_ERROR:
      return state.set('currentState', UPLOAD_ERROR)
        .set('error', action.error);
    default:
      return state;
  }
}
