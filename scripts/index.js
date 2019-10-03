const json2md = require("json2md");
const source = require("./source.json");
const people = require("../people.json");

const tableIndex = 2;
const sourceJson = () => {
    let head = source[tableIndex].table.headers;
    let rows = [];

    for (let i = 0; i < people.length; i++) {
        let row = i + 1 + '';
        rows[i] = {
            '#': row.padStart(2, '0'),
            [head.name]: people[i].name ? `${people[i].name}`.replace(" ", "&nbsp;") : "![Unknown]",
            [head.about]: people[i].about ? `${people[i].about}` : "![Unknown]",
            "Contact": (people[i].email ? `[![Email]](mailto:${people[i].email})` : "") + '&nbsp;' +
                (people[i].weblog ? `[![Weblog]](${people[i].weblog})` : "") + '&nbsp;' +
                (people[i].linkedin ? `[![LinkedIn]](https://linkedin.com/in/${people[i].linkedin})` : "") + '&nbsp;' +
                (people[i].github ? `[![GitHub]](https://github.com/${people[i].github})` : "") + '&nbsp;' +
                (people[i].twitter ? `[![Twitter]](https://twitter.com/${people[i].twitter})` : "") + '&nbsp;' +
                (people[i].instagram ? `[![Instagram]](https://instagram.com/${people[i].instagram})` : "") + '&nbsp;' +
                (people[i].telegram ? `[![Telegram]](https://t.me/${people[i].telegram})` : "")
        }
    }

    source[tableIndex].table.rows = rows;
    source[tableIndex].table.headers = ['#', head.name, head.about, "Contact"];

    return source;
};
const outputData = `<div dir="rtl">\n\n${json2md(sourceJson(), null)}\n</div>\n`;

process.stdout.write(outputData);
