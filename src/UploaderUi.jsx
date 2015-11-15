import React from 'react';
import {
  FlatButton,
  Card,
  CardMedia,
  CardActions,
  CircularProgress,
  IconButton } from 'material-ui';
import Dropzone from 'react-dropzone';
import { UPLOAD_IN_PROGRESS, UPLOAD_ERROR, UPLOAD_FINISHED, INITIAL } from './constants';

const FileCloudUpload = require('material-ui/lib/svg-icons/file/cloud-upload');

export default React.createClass({
  propTypes: {
    s3Signer: React.PropTypes.string.isRequired,
    imageUrl: React.PropTypes.string,
    currentState: React.PropTypes.string,
    error: React.PropTypes.string,
    fileType: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    uploadImage: React.PropTypes.func.isRequired,
    onFinish: React.PropTypes.func,
    onProgress: React.PropTypes.func,
    onError: React.PropTypes.func,
  },
  getDefaultProps: function() {
    return {
      fileType: 'file',
      width: 250,
      height: 300,
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if (this.props.currentState !== nextProps.currentState) {
      switch (nextProps.currentState) {
        case UPLOAD_IN_PROGRESS:
          return this.props.onProgress();
        case UPLOAD_ERROR:
          return this.props.onError(nextProps.error);
        case UPLOAD_FINISHED:
          return this.props.onFinish(nextProps.imageUrl);
        default:
          return null;
      }
    }
  },
  handleFile: function(event) {
    this.props.uploadImage(this.props.s3Signer, event.target.files[0]);
  },
  handleDropFile: function(file) {
    this.props.uploadImage(this.props.s3Signer, file[0]);
  },
  render: function() {
    const { width, height } = this.props;
    const progress = <CircularProgress mode="indeterminate" />;
    const error = (
      <h6 className="red">
        Something went wrong, please try to upload image again
      </h6>
    );
    const noImageIcon = (
      <div style={ { paddingRight: '18px' } }>
        <IconButton iconStyle={ { width: '50', height: '50', padding: 0 } }>
          <FileCloudUpload/>
        </IconButton>
      </div>
    );
    const image = (
      <img
        ref="image"
        style={ { maxWidth: width, maxHeight: height * 0.9 } }
        src={ this.props.imageUrl }/>
    );
    return (
      <div style={ { width: width, height: height, background: '#FFFFFF' } }>
        <Card>
          <CardMedia>
            <div
              className="table center"
              style={ { backgroundColor: '#EFEFEF', height: height * 0.9 } }>
              <Dropzone
                onDrop={ this.handleDropFile }
                style={ {
                  width: width,
                  display: 'table-cell',
                  verticalAlign: 'middle',
                  textAlign: 'center' } }
                activeStyle={ { backgroundColor: '#C8C8C8' } }>
                { (() => {
                  switch (this.props.currentState) {
                    case UPLOAD_IN_PROGRESS: return progress;
                    case UPLOAD_ERROR: return error;
                    case INITIAL: return noImageIcon;
                    default: return image;
                  }
                } )() }
              </Dropzone>
            </div>
          </CardMedia>
          <CardActions>
            <FlatButton secondary label={ 'Upload ' + this.props.fileType }>
              <div
                className="absolute top-0 bottom-0 left-0 right-0 "
                style={ { opacity: 0, width: '100%', height: '100%' } }>
                <input
                  type="file"
                  onChange={ this.handleFile }
                  accept={ this.props.fileType + '/*' } />
              </div>
            </FlatButton>
          </CardActions>
        </Card>
      </div>
    );
  },
});
