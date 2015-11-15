#### ReactS3FileUploader

Provides a React component that automatically uploads images to an Applicaster S3 Bucket.

This components using  ```react-dropzone``` component, which allows for drag and drop functionality,

and material-ui design.


1. ```import S3Uploader from 'react-s3-file-uploader'```
2. ``` 
<S3Uploader 
   s3Signer="ENDPOINT_TO_GET_SIGNED_URL" 
   fileType="image"
   imageUrl="this.imageUrl"
   width={ 250 }
   height={ 300 }
   onProgress={this.onProgress} 
   onFinish={this.onFinish} 
   onError={this.onError} 
  />```

The above example shows all supported props.

**```s3Signer```**   - On your server you will need to set up an endpoint to handle a GET request which will take a filename  as parameter.
This module will return a URL that looks something like this: 
``` https://SOME_BUCKET.s3.amazonaws.com/filename.jpg?AWSAccessKeyId=AKIAJDTJA3OMXXXXXXXX&Content-Type=image%2Fjpeg&Expires=1436472979&Signature=%2Fy5LRLwSH%2FzqD1nK5Jjxxxxx84%3D ```

* See below server stuff code snippet using Ruby or Node.

**```imageUrl```** -  is optional prop

**```fileType```** -  if not added, the default will allow to upload all kind of files. Valid options are ```image``` or ```video```.

**```width```** - if not added, the default will be 250px.

**```height```** -  if not added, the default will be 300px.

**```onProgress, onFinish, onError```** -  are mandatory cb functions


***

### Ruby code example

```
def show
    render json: {signature: aws_signature_v4(params[:name]), asset_uri: signer.asset_uri}
end

def aws_signature_v4(file_name)
    bucket = AWS::S3.new(
      access_key_id: Settings.amazon_s3_access_key_id, 
      secret_access_key: Settings.amazon_s3_secret_access_key
      ).buckets[Settings.amazon_s3_bucket]
    path = File.join(Settings.amazon_s3_base_path, file_name)
    object = bucket.objects[path]

    AWS::S3::PresignV4.new(object)
      .presign(:write, secure: true, acl: "public-read", expires: 4.hours.from_now.to_i)
      .to_s
end

def asset_uri(file_name)
    File.join(Settings.assets_uri, Settings.amazon_s3_base_path, file_name)
end  



```

### Node code example

```
const aws = require('aws-sdk');
const path = require('path');

aws.config.update({
    accessKeyId: AWS_ACCESS_KEY
    secretAccessKey: AWS_SECRET_KEY
});

exports = module.exports = {
    sign: function(filename, filetype) {
        var s3 = new aws.S3();

        var params = {
            Bucket: SOME_BUCKET,
            Key: filename,
            Expires: 60,
            ContentType: filetype
        };

        s3.getSignedUrl(‘putObject’, params, function(err, data) {
            if (err) {
                console.log(err);
                return err;
            } else {
                return {signature: data, asset_uri: path.join(AWS_ASSETS_URI, SOME_BUCKET, filename)};
            }
        });
    }
};
```