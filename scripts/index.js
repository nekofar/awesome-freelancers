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
            [head.about]: rows[i].about + (
                (rows[i].email ? `[![Email]](mailto:${rows[i].email})` : "![Unknown]" )+
                    (rows[i].weblog ? `[![Weblog]](${rows[i].weblog})` : "![Unknown]" )+
                        (rows[i].linkedin ? `[![LinkedIn]](https://linkedin.com/in/${rows[i].linkedin})` : "![Unknown]" )+
                            (rows[i].github ? `[![GitHub]](https://github.com/${rows[i].github})` : "![Unknown]" )+
                                (rows[i].twitter ? `[![Twitter]](https://twitter.com/${rows[i].twitter})` : "![Unknown]" )+
                                    (rows[i].instagram ? `[![Instagram]](https://instagram.com/${rows[i].instagram})` : "![Unknown]" )+
                                        (rows[i].telegram ? `[![Telegram]](https://t.me/${rows[i].telegram})` : "![Unknown]"))
        }
    }

    source[tableIndex].table.rows = rows;
    source[tableIndex].table.headers = ['#', head.name, head.about];

    return source;
};
const outputData = `<div dir="rtl">\n\n${json2md(sourceJson(), null)}\n</div>\n`;

process.stdout.write(outputData);
