const json2md = require('json2md');
const source = require('./source.json');
const people = require('../people.json');
const lodash = require('lodash');

const countIndex = 1;
const tableIndex = 2;

const buildIcon = (link, icon, title) => {
  let picture =
    `<picture>` +
    `<source media="(prefers-color-scheme: dark)" srcset="assets/icons/dark/${icon}.svg?raw=true">` +
    `<source media="(prefers-color-scheme: light)" srcset="assets/icons/light/${icon}.svg?raw=true">` +
    `<img alt="${title}" src="assets/icons/light/${icon}.svg?raw=true">` +
    `</picture>`;

  return link ? `<a href="${link}">${picture}</a>` : picture;
};

const sourceJson = () => {
  let head = source[tableIndex].table.headers;
  head.email = buildIcon(null, 'envelope-square', 'Email');
  head.weblog = buildIcon(null, 'rss-square', 'Weblog');
  head.linkedin = buildIcon(null, 'linkedin', 'LinkedIn');
  head.github = buildIcon(null, 'github-square', 'GitHub');
  head.twitter = buildIcon(null, 'twitter-square', 'Twitter');
  head.instagram = buildIcon(null, 'instagram', 'Instagram');
  head.telegram = buildIcon(null, 'telegram', 'Telegram');

  let rows = lodash
    .chain(people)
    .sortBy('firstName')
    .sortBy('lastName')
    .partition('lastName')
    .flatten()
    .value();

  for (let i = 0; i < rows.length; i++) {
    let name = `${rows[i].firstName} ${rows[i].lastName}`;
    rows[i] = {
      [head.name]: name.replace(' ', '&nbsp;'),
      [head.about]: rows[i].about,
      [head.email]: rows[i].email
        ? buildIcon(`mailto:${rows[i].email}`, 'envelope-square', 'Email')
        : buildIcon(null, 'square', 'Unknown'),
      [head.weblog]: rows[i].weblog
        ? buildIcon(`${rows[i].weblog}`, 'rss-square', 'Weblog')
        : buildIcon(null, 'square', 'Unknown'),
      [head.linkedin]: rows[i].linkedin
        ? buildIcon(
            `https://linkedin.com/in/${rows[i].linkedin}`,
            'linkedin',
            'LinkedIn',
          )
        : buildIcon(null, 'square', 'Unknown'),
      [head.github]: rows[i].github
        ? buildIcon(
            `https://github.com/${rows[i].github}`,
            'github-square',
            'GitHub',
          )
        : buildIcon(null, 'square', 'Unknown'),
      [head.twitter]: rows[i].twitter
        ? buildIcon(
            `https://twitter.com/${rows[i].twitter}`,
            'twitter-square',
            'Twitter',
          )
        : buildIcon(null, 'square', 'Unknown'),
      [head.instagram]: rows[i].instagram
        ? buildIcon(
            `https://instagram.com/${rows[i].instagram}`,
            'instagram',
            'Instagram',
          )
        : buildIcon(null, 'square', 'Unknown'),
      [head.telegram]: rows[i].telegram
        ? buildIcon(`https://t.me/${rows[i].telegram}`, 'telegram', 'Telegram')
        : buildIcon(null, 'square', 'Unknown'),
    };
  }

  source[countIndex]['p'] = source[countIndex]['p'].replace(
    '#count#',
    rows.length,
  );

  source[tableIndex].table.rows = rows;
  source[tableIndex].table.headers = [...Object.values(head)];

  return source;
};

const outputData = `<div dir='rtl'>\n\n${json2md(
  sourceJson(),
  null,
)}\n</div>\n`;

process.stdout.write(outputData);
