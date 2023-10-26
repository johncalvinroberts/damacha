import { writeFile } from 'fs/promises';
import path from 'path';
import prompts from 'prompts';
import dayjs from 'dayjs';
import crypto from 'crypto';
import { kebabCase } from '@/lib/utils';
import tracks from '../data/tracks.json';
import { Track } from '@/types/app';

const filename = path.join(__dirname, '../data', 'tracks.json');

const generateId = (index: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(2, (err, buf) => {
      if (err) reject(err);
      const id = buf.toString('hex');
      resolve(`${index + 1}-${id}`);
    });
  });
};

(async () => {
  const dateUploaded = dayjs(new Date()).format('yyyy-MM-dd');
  const response = await prompts([
    {
      type: 'text',
      name: 'url',
      message: 'Please enter URL',
      validate: (value: string) => {
        try {
          new URL(value);
          return true;
        } catch (error) {
          return false;
        }
      },
    },
    {
      type: 'text',
      name: 'trackName',
      message: 'Please enter Track Name',
    },
    {
      type: 'text',
      name: 'remark',
      message: 'Add a remark',
    },
  ]);

  const { trackName, url, remark } = response;
  const slug = encodeURIComponent(kebabCase(trackName));
  const id = await generateId(tracks.length);
  const track: Omit<Track, 'index'> = {
    trackName,
    slug,
    url,
    dateUploaded,
    id,
    remark,
  };
  console.log(JSON.stringify(track, null, 2)); // eslint-disable-line
  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: 'Add track?',
  });

  if (confirm) {
    tracks.push(track);
    await writeFile(filename, JSON.stringify(tracks, null, 2));
  }
})();
