const json2md = require('json2md');
const source = require('./source.json');
const people = require('../people.json');
const lodash = require('lodash');

const countIndex = 1;
const tableIndex = 2;
const sourceJson = () => {
  let head = source[tableIndex].table.headers;
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
        ? `[![Email]](mailto:${rows[i].email})`
        : '![Unknown]',
      [head.weblog]: rows[i].weblog
        ? `[![Weblog]](${rows[i].weblog})`
        : '![Unknown]',
      [head.linkedin]: rows[i].linkedin
        ? `[![LinkedIn]](https://linkedin.com/in/${rows[i].linkedin})`
        : '![Unknown]',
      [head.github]: rows[i].github
        ? `[![GitHub]](https://github.com/${rows[i].github})`
        : '![Unknown]',
      [head.twitter]: rows[i].twitter
        ? `[![Twitter]](https://twitter.com/${rows[i].twitter})`
        : '![Unknown]',
      [head.instagram]: rows[i].instagram
        ? `[![Instagram]](https://instagram.com/${rows[i].instagram})`
        : '![Unknown]',
      [head.telegram]: rows[i].telegram
        ? `[![Telegram]](https://t.me/${rows[i].telegram})`
        : '![Unknown]'
    };
  }

  source[countIndex]["p"] = source[countIndex]["p"].replace('#count#', rows.length);

  source[tableIndex].table.rows = rows;
  source[tableIndex].table.headers = [...Object.values(head)];

  return source;
};
const outputData = `<div dir="rtl">\n\n${json2md(
  sourceJson(),
  null
)}\n</div>\n`;

process.stdout.write(outputData);
