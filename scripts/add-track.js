const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const prompts = require('prompts');
const isUrl = require('is-url');
const hyphenate = require('lodash.kebabcase');
const datefns = require('date-fns');
const crypto = require('crypto');
const tracks = require('../src/tracks.json');

const writeFile = promisify(fs.writeFile);

const filename = path.join(__dirname, '../src', 'tracks.json');

const generateId = (index) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(2, (err, buf) => {
      if (err) reject(err);
      const id = buf.toString('hex');
      resolve(`${index + 1}-${id}`);
    });
  });
};

(async () => {
  const dateUploaded = datefns.format(new Date(), 'yyyy-MM-dd');
  const response = await prompts([
    {
      type: 'text',
      name: 'url',
      message: 'Please enter URL',
      validate: (value) => isUrl(value),
    },
    {
      type: 'text',
      name: 'trackName',
      message: 'Please enter Track Name',
    },
  ]);

  const { trackName, url } = response;
  const slug = encodeURIComponent(hyphenate(trackName));
  const id = await generateId(tracks.length);
  const track = { trackName, slug, url, dateUploaded, id };
  console.log(JSON.stringify(track, null, 2)); //eslint-disable-line
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
