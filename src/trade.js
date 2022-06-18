const fetch = require('node-fetch');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const moment = require('moment');
const fs = require('fs');
const path = require('path');

!(async () => {
  console.log(`current time: ${new Date().toISOString()}`);


  const today = { date: moment().format('YYYY-MM-DD') };
  const text = await fetch('https://hz-realte-proxy-china-dl-estate-kzsdljebhh.cn-shanghai.fcapp.run').then(d => d.text());
  // const text = await fetch('https://api.hzfc.cn/hzfcweb_ifs/interaction/scxx').then(d => d.text());
  const dom = new JSDOM(text);
  
  // 可售卖房源
  // 数组含义：区域，可售套数，可售面积，住宅可售套数，住宅可售面积
  const availableHouse = Array.from(
    dom.window.document.querySelectorAll('#scroll-wrap .list-item')
  )
    .map(d => d.textContent.trim())
    .filter(t => t)
    .map(t => t.split('\n').map(t => t.trim()));

  console.log(availableHouse);


  // 商品房累计成交
  // 数组含义：区域，可售套数，可售面积，住宅可售套数，住宅可售面积
  const commercialHouse = Array.from(
    dom.window.document.querySelectorAll('#con1 .list-item')
  )
    .map(d => d.textContent.trim())
    .filter(t => t)
    .map(t => t.split('\n').map(t => t.trim()));

  console.log(commercialHouse);


  // 二手房累计成交
  // 数组含义：区域，可售套数，可售面积，住宅可售套数，住宅可售面积
  const previouslyOwnedHouse = Array.from(
    dom.window.document.querySelectorAll('#con3 .list-item')
  )
    .map(d => d.textContent.trim())
    .filter(t => t)
    .map(t => t.split('\n').map(t => t.trim()));

  console.log(previouslyOwnedHouse);


  today.availableHouse = availableHouse;
  today.commercialHouse = commercialHouse;
  today.previouslyOwnedHouse = previouslyOwnedHouse;

  const filePath = path.join(__dirname, `../assets/trade-${today.date}.json`);
  fs.writeFileSync(filePath, JSON.stringify(today));
  console.log(today)
})();