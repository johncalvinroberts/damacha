import { Track } from '../types/app';
import __tracks from '../data/tracks.json';
import pAll from 'p-all';
import fs from 'node:fs';
import path from 'node:path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const BUCKET_NAME = 'damacha';
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID as string;
const R2_ACCESS_KEY_SECRET = process.env.R2_ACCESS_KEY_SECRET as string;
const CLOUDFLARE_URL = `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com/buckets/${BUCKET_NAME}/objects`;
const BUCKET_PUBLIC_URL = 'https://beats.damachabeats.com';

// Configure the S3 client for R2
const s3Client = new S3Client({
  region: 'auto', // R2 requires this to be 'auto'
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_ACCESS_KEY_SECRET,
  },
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const transferToR2 = async (track: Track): Promise<string> => {
  const { url } = track;
  const fileName = url.split('/').pop() || '';
  console.log(`Transferring: ${fileName}. Starting by fetching the raw URL`);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  const data = await response.arrayBuffer();
  console.log(`Successfully fetched data for ${fileName}, uploading to r2`);
  // Create the upload command
  const uploadCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    Body: Buffer.from(data),
    ContentType: 'audio/mpeg', // Adjust based on your file type
  });

  // Execute the upload
  const uploadResult = await s3Client.send(uploadCommand);

  console.log(`Successfully uploaded ${fileName} to Cloudflare.`, uploadResult);
  await delay(1000);
  return `${BUCKET_PUBLIC_URL}/${fileName}`;
};

const main = async () => {
  const tracks = __tracks as Track[];
  const works: (() => Promise<string>)[] = [];
  console.log('Starting...');
  for (const track of tracks) {
    works.push(() => transferToR2(track));
  }
  const r2Urls = await pAll(works, { concurrency: 1 });
  console.log('Uploaded all tracks to cloudflare! Writing to disk');
  for (const [index] of tracks.entries()) {
    tracks[index].cloudflareURL = r2Urls[index];
  }

  fs.writeFileSync(
    path.join(__dirname, '../data/updated_tracks.json'),
    JSON.stringify(tracks, null, 2),
  );
  console.log('Done!!!');
};

main();
