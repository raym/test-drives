// Imports your configured client and any necessary S3 commands.
import { GetObjectCommand } from "@aws-sdk/client-s3";
import {
  existsSync,
  mkdirSync,
  writeFileSync,
} from "fs";
import { getClient } from "../lib/getClient.js";
import { getSpaceName } from '../lib/getSpaceName.js'
import { createInterface } from 'readline';

const readline = createInterface({
  input: process.stdin,
  output: process.stdout,
})

const readLineAsync = prompt => {
  return new Promise(resolve => {
    readline.question(prompt, userResponse => {
      resolve(userResponse);
    });
  });
}

// Function to turn the file's body into a string.
const streamToString = (stream) => {
  const chunks = [];
  return new Promise((resolve, reject) => {
    stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  });
};

// Downloads your file and saves its contents to /tmp/local-file.ext.
const run = async () => {
  const pathToFile = await readLineAsync('what is the space path to the file you want to download? ')

  const bucketParams = {
    Bucket: getSpaceName(),
    Key: pathToFile,
  };

  const downloadDirectory = './downloads'

  try {
    const response = await getClient().send(new GetObjectCommand(bucketParams));
    const data = await streamToString(response.Body);
    if (!existsSync(downloadDirectory)) mkdirSync(downloadDirectory)
    const writeTo = `${downloadDirectory}/${pathToFile}`
    console.log(`writing to ${writeTo}`)
    writeFileSync(writeTo, data);
    console.log("Success");
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

run().then(() => process.exit())

