import * as dotenv from 'dotenv'
import { S3 } from "@aws-sdk/client-s3";

dotenv.config()

export const getClient = () => new S3({
  endpoint: process.env.SPACES_ENDPOINT, // Find your endpoint in the control panel, under Settings. Prepend "https://".
  region: process.env.SPACES_REGION, // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: process.env.SPACES_SECRET_KEY // Secret access key defined through an environment variable.
  }
});

