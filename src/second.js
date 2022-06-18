const fetch = require('node-fetch');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

!(async () => {
  console.log(`current time: ${new Date().toISOString()}`);
  const today = { date: moment().format('YYYY-MM-DD'), timestamp: Date.now() };

  const all = await fetch("http://www.tmsf.com/esfn/EsfnSearch_sellhousNewList.jspx", {
    "headers": {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    "body": "wawjrp=6&rp=16",
    "method": "POST",
  }).then(d => d.json());

  const drop = await fetch("http://www.tmsf.com/esfn/EsfnSearch_sellhousNewList.jspx", {
    "headers": {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    "body": "wawjrp=6&rp=16&isdrop=1",
    "method": "POST",

  }).then(d => d.json());

  const rise = await fetch("http://www.tmsf.com/esfn/EsfnSearch_sellhousNewList.jspx", {
    "headers": {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    "body": "wawjrp=6&rp=16&isrise=1",
    "method": "POST",

  }).then(d => d.json());

  const isnew = await fetch("http://www.tmsf.com/esfn/EsfnSearch_sellhousNewList.jspx", {
    "headers": {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    "body": "wawjrp=6&rp=16&isonnew=1",
    "method": "POST",
  }).then(d => d.json())

  today.all = all?.allcounts;
  today.drop = drop?.allcounts;
  today.rise = rise?.allcounts;
  today.isnew = isnew?.allcounts;

  const filePath = path.join(__dirname, `../assets/tmsf-second-${today.date}.json`);
  fs.writeFileSync(filePath, JSON.stringify(today));
  console.log(today)
})();
