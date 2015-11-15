import api from './api';

function uploadFinished(fileData) {
  return {
    type: 'UPLOAD_FINISHED',
    imageUrl: fileData,
  };
}

function uploadInProgress() {
  return {
    type: 'UPLOAD_IN_PROGRESS',
  };
}

function uploadError(error) {
  return {
    type: 'UPLOAD_ERROR',
    error,
  };
}

export function uploadImage(s3Signer, file) {
  let imageUrl;
  return (dispatch) => {
    dispatch(uploadInProgress());
    return (
      api
        .getS3SignedUrl(s3Signer, file)
        .then((signer) => {
          imageUrl = signer.data.asset_uri;
          api.uploadFile(signer.data.signature, file)
          .then(() => { dispatch(uploadFinished(imageUrl)); })
          .catch(res => dispatch(uploadError(res.data)));
        })
        .catch(res => dispatch(uploadError(res.data)))
    );
  };
}
