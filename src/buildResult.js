const moment = require('moment');
const fs = require('fs');
const path = require('path');

const FIRST_DAY = new Date("2022-06-18").getTime(); // first day
const ONE_DAY = 60 * 60 * 24 * 1000;

const FINAL_RESULT = [];
// [
//   date: '2022-06-18',
//   `availableHouse${name}_number`: 12,
//   `availableHouse${name}_area`: 12,
//   `commercialHouse_${name}_number`: 12,
//   `commercialHouse_${name}_area`: 12,
//   `previouslyOwnedHouse_${name}_number`: 12,
//   `previouslyOwnedHouse_${name}_area`: 12
// ]


let FAIL_TIMES = 0;
let i = 0;
while (FAIL_TIMES < 4) {
  const currentDay = moment(FIRST_DAY + i * ONE_DAY).format('YYYY-MM-DD');
  try {
    const file = JSON.parse(String(
      fs.readFileSync(path.join(__dirname, `../assets/trade-${currentDay}.json`))
    ));

    const cresult = {};
    file.availableHouse.forEach(item => {
      // 从 2023 12 月开始，官方数据中加了区，比如：滨江 改成了 滨江区
      // 为方便和原有数据融合，统一把 区 去掉
      cresult[`可售套数_${item[0].replace('区', '')}`] = Number(item[3].replace('套', ''));
      cresult[`可售面积_${item[0].replace('区', '')}`] = Number(item[4].replace('m²', ''));
    });
    file.commercialHouse.forEach(item => {
      cresult[`商品房成交套数_${item[0].replace('区', '')}`] = Number(item[3].replace('套', ''));
      cresult[`商品房成交面积_${item[0].replace('区', '')}`] = Number(item[4].replace('m²', ''));
    });
    file.previouslyOwnedHouse.forEach(item => {
      cresult[`二手房成交套数_${item[0].replace('区', '')}`] = Number(item[3].replace('套', ''));
      cresult[`二手房成交面积_${item[0].replace('区', '')}`] = Number(item[4].replace('m²', ''));
    });

    FINAL_RESULT.push({
      date: currentDay,
      ...cresult
    })

    i++;
    FAIL_TIMES = 0;
  } catch(err) {
    i++;
    FAIL_TIMES++;
  }
}


fs.writeFileSync(path.join(__dirname, '../public/result.json'), JSON.stringify(FINAL_RESULT));
