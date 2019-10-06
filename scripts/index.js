const json2md = require("json2md");
const source = require("./source.json");
const people = require("../people.json");
const {shuffle} = require('lodash');

const tableIndex = 3;
const sourceJson = () => {
    let head = source[tableIndex].table.headers;
    let rows = shuffle(people);

    for (let i = 0; i < rows.length; i++) {
        let row = i + 1 + '';
        rows[i] = {
            '#': row.padStart(2, '0'),
            [head.name]: rows[i].name ? `${rows[i].name}`.replace(" ", "&nbsp;") : "![Unknown]",
            [head.about]: rows[i].about + "<br>" + (
                (rows[i].email ? `[![Email]](mailto:${rows[i].email})` : "" )+
                    (rows[i].weblog ? `[![Weblog]](${rows[i].weblog})` : "" )+
                        (rows[i].linkedin ? `[![LinkedIn]](https://linkedin.com/in/${rows[i].linkedin})` : "" )+
                            (rows[i].github ? `[![GitHub]](https://github.com/${rows[i].github})` : "" )+
                                (rows[i].twitter ? `[![Twitter]](https://twitter.com/${rows[i].twitter})` : "" )+
                                    (rows[i].instagram ? `[![Instagram]](https://instagram.com/${rows[i].instagram})` : "" )+
                                        (rows[i].telegram ? `[![Telegram]](https://t.me/${rows[i].telegram})` : ""))
        }
    }

    source[tableIndex].table.rows = rows;
    source[tableIndex].table.headers = ['#', head.name, head.about];

    return source;
};
const outputData = `<div dir="rtl">\n\n${json2md(sourceJson(), null)}\n</div>\n`;

process.stdout.write(outputData);
