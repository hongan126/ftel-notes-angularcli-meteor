import {Injectable} from '@angular/core';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadFileService {

  FOLDER = 'ftel-notes/';

  constructor() {
  }

  uploadfile(file): Promise<any> {

    const bucket = new AWS.S3(
      {
        accessKeyId: 'AKIAJUYE6DC5GSJIUYGQ',
        secretAccessKey: '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',
        region: 'us-east-2'
      }
    );

    const params = {
      Bucket: 'my-images-bucket',
      Key: this.FOLDER + Date.now() + '_' + file.name.replace('/\s/', '_'),
      Body: file
    };

    const s3UploadPromise = new Promise(function(resolve, reject) {
      bucket.upload(params, function (err, data) {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          reject(err);
        }
        console.log('Successfully uploaded file.', data);
        resolve(data);
      });
    });
    return s3UploadPromise;
  }
}
