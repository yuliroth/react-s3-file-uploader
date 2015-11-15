import request from 'axios';

export default {
  getS3SignedUrl(s3Signer, file) {
    return request({
      method: 'GET',
      url: s3Signer,
      responseType: 'json',
      params: { name: file.name },
    });
  },

  uploadFile(signedUrl, file) {
    return request({
      method: 'PUT',
      url: signedUrl,
      responseType: 'json',
      data: file,
      headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' },
    });
  },
};

