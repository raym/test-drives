import * as dotenv from 'dotenv'
import { platform } from 'os'
import { exec } from 'child_process'

// Step 1: Import the S3Client object and all necessary SDK commands.
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

dotenv.config()

// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
  endpoint: process.env.SPACES_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
  region: process.env.SPACES_REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: process.env.SPACES_SECRET_KEY // Secret access key defined through an environment variable.
  }
});


// Step 3: Define the parameters for the object you want to upload.
const params = {
  Bucket: process.env.SPACES_SPACE_NAME, // The path to the directory you want to upload the object to, starting with your Space name.
  Key: "hello-world.txt", // Object key, referenced whenever you want to access this file later.
  Body: "Hello, World!", // The object's contents. This variable is an object, not a string.
  ACL: "public-read", // Defines ACL permissions, such as private or public.
  Metadata: { // Defines metadata tags.
    "x-amz-meta-my-key": "your-value"
  }
};


// Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
const uploadObject = async () => {
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log(
      "Successfully uploaded object: " +
      params.Bucket +
      "/" +
      params.Key
    );

    if (platform() === 'darwin') {
      exec(`open ${process.env.SPACES_ENDPOINT}/${process.env.SPACES_SPACE_NAME}/hello-world.txt`)
    }
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};


// Step 5: Call the uploadObject function.
uploadObject();

