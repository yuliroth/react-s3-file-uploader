import { expect } from 'chai';
import { fromJS } from 'immutable';
import reducer from '../src/reducer';
import { UPLOAD_IN_PROGRESS, UPLOAD_ERROR, UPLOAD_FINISHED, INITIAL } from '../src/constants';
let state = null;
let aciton = null;

describe('ImageUploader reducer', () => {
  it('has an initial state', () => {
    const initialState = reducer(undefined, {});

    expect(initialState).to.equal(fromJS({
      imageUrl: '',
      currentState: INITIAL,
    }));
  });

  describe('UPLOAD_FINISHED action', () => {
    beforeEach(() => {
      aciton = {
        type: 'UPLOAD_FINISHED',
        imageUrl: 'http://some_image.com',
      };
      state = reducer(undefined, aciton);
    });

    it('has an state with imageUrl', () => {
      expect(state.get('imageUrl')).to.equal(aciton.imageUrl);
    });

    it('has an state with currentState: UPLOAD_FINISHED', () => {
      expect(state.get('currentState')).to.equal(UPLOAD_FINISHED);
    });

    it('has an state with errors: null', () => {
      expect(state.get('error')).to.equal(null);
    });
  });

  describe('UPLOAD_IN_PROGRESS action', () => {
    beforeEach(() => {
      aciton = {
        type: 'UPLOAD_IN_PROGRESS',
      };
      state = reducer(undefined, aciton);
    });

    it('has an state with progress', () => {
      expect(state.get('currentState')).to.equal(UPLOAD_IN_PROGRESS);
    });
  });

  describe('UPLOAD_ERROR action', () => {
    beforeEach(() => {
      aciton = {
        type: 'UPLOAD_ERROR',
        error: 'some error',
      };
      state = reducer(undefined, aciton);
    });

    it('has an error', () => {
      expect(state.get('error')).to.equal(aciton.error);
    });

    it('has an error state', () => {
      expect(state.get('currentState')).to.equal(UPLOAD_ERROR);
    });
  });
});
