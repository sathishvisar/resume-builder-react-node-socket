import AWS from 'aws-sdk';
import fs from 'fs';
import mime from 'mime-types'

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


export const uploadImageFromFile = async (filePath: string, s3FileName: string) => {
    if(!filePath) return ''
  const fileBuffer = fs.readFileSync(filePath);
  const mimeType = mime.lookup(filePath) || 'application/octet-stream';

  const bucketName = process.env.AWS_BUCKET_NAME;
  if (!bucketName) {
    throw new Error('Missing AWS_BUCKET_NAME in environment variables');
  }

  const params = {
    Bucket: bucketName,
    Key: s3FileName,
    Body: fileBuffer,
    ContentType: mimeType,
    // ACL: 'public-read',
  };

  const result = await s3.upload(params).promise();
  return result.Location;
};