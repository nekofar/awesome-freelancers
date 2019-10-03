const json2md = require("json2md");
const source = require("./source.json");
const people = require("../people.json");

const tableIndex = 2;
const sourceJson = () => {
    let head = source[tableIndex].table.headers;
    let rows = [];

    for (let i = 0; i < people.length; i++) {
        rows[i] = {
            [head.name]: people[i].name ? `${people[i].name}` : "-",
            [head.about]: people[i].about ? `${people[i].about}` : "-",
            [head.email]: people[i].email ? `[![Email]](mailto:${people[i].email})` : "-",
            [head.weblog]: people[i].weblog ? `[![Weblog]](${people[i].weblog})` : "-",
            [head.linkedin]: people[i].linkedin ? `[![LinkedIn]](https://linkedin.com/in/${people[i].linkedin})` : "-",
            [head.github]: people[i].github ? `[![GitHub]](https://github.com/${people[i].github})` : "-",
            [head.twitter]: people[i].twitter ? `[![Twitter]](https://twitter.com/${people[i].twitter})` : "-",
            [head.instagram]: people[i].instagram ? `[![Instagram]](https://instagram.com/${people[i].instagram})` : "-",
            [head.telegram]: people[i].telegram ? `[![Telegram]](https://t.me/${people[i].telegram})` : "-"
        }
    }

    source[tableIndex].table.rows = rows;
    source[tableIndex].table.headers = Object.values(head);

    return source;
};
const outputData = `<div dir="rtl">\n${json2md(sourceJson(), null)}\n</div>`;

process.stdout.write(outputData);
