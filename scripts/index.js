const json2md = require("json2md");
const source = require("./source.json");
const people = require("../people.json");

const tableIndex = 2;
const sourceJson = () => {
    let head = source[tableIndex].table.headers;
    let rows = [];

    for (let i = 0; i < people.length; i++) {
        rows[i] = {
            [head.name]: people[i].name ? `**${people[i].name}**`.replace(" ", "&nbsp;") : "![Unknown]",
            [head.about]: people[i].about ? `${people[i].about}` : "![Unknown]",
            [head.email]: people[i].email ? `[![Email]](mailto:${people[i].email})` : "![Unknown]",
            [head.weblog]: people[i].weblog ? `[![Weblog]](${people[i].weblog})` : "![Unknown]",
            [head.linkedin]: people[i].linkedin ? `[![LinkedIn]](https://linkedin.com/in/${people[i].linkedin})` : "![Unknown]",
            [head.github]: people[i].github ? `[![GitHub]](https://github.com/${people[i].github})` : "![Unknown]",
            [head.twitter]: people[i].twitter ? `[![Twitter]](https://twitter.com/${people[i].twitter})` : "![Unknown]",
            [head.instagram]: people[i].instagram ? `[![Instagram]](https://instagram.com/${people[i].instagram})` : "![Unknown]",
            [head.telegram]: people[i].telegram ? `[![Telegram]](https://t.me/${people[i].telegram})` : "![Unknown]"
        }
    }

    source[tableIndex].table.rows = rows;
    source[tableIndex].table.headers = Object.values(head);

    return source;
};
const outputData = `<div dir="rtl">\n\n${json2md(sourceJson(), null)}\n</div>\n`;

process.stdout.write(outputData);
