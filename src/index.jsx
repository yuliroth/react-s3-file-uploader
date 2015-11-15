import React from 'react';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { uploadImage } from './actions';
import UploaderUi from './UploaderUi';
import configureStore from './store';

function mapStateToProps(state) {
  return {
    imageUrl: state.get('imageUrl'),
    currentState: state.get('currentState'),
    error: state.get('error'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( {
    uploadImage,
  }, dispatch);
}

const ConnectedUploader = connect(
  mapStateToProps,
  mapDispatchToProps
)(UploaderUi);

export default React.createClass({
  render() {
    const store = configureStore();
    return (
      <Provider store={ store }>
        <ConnectedUploader { ...this.props }/>
      </Provider>
    );
  },
});
