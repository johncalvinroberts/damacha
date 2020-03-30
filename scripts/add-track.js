const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const prompts = require('prompts');
const isUrl = require('is-url');
const hyphenate = require('lodash.kebabcase');
const datefns = require('date-fns');
const tracks = require('../src/tracks.json');

const writeFile = promisify(fs.writeFile);

const filename = path.join(__dirname, '../src', 'tracks.json');
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
  const slug = hyphenate(trackName);
  const track = { trackName, slug, url, dateUploaded };
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
