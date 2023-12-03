import dayjs from 'dayjs'
import crypto from 'crypto-js'
import fs from 'fs'

const sleep = t => new Promise(resolve => setTimeout(resolve, t))

function dec (e) {
  var a = dayjs().add(-4, 'hour').format('YYYYMMDD')
  a = crypto.MD5(a).toString()
  var o = dayjs().add(-4, 'hour').format('YYYYMMDD')
  ;(o = (o = crypto.MD5(o).toString()).substring(8, 24)),
    (a = crypto.enc.Utf8.parse(a)),
    (o = crypto.enc.Utf8.parse(o))
  var d = crypto.AES.decrypt(e, a, {
    iv: o,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  })
  return JSON.parse(d.toString(crypto.enc.Utf8))
}

function fetchData (date) {
  return fetch(`https://api.hangfang-data.com/statistics/get`, {
    method: 'post',
    headers: {
      'content-type': 'application/json',
      referer:
        'https://servicewechat.com/wx7765bb88a39ee9cb/239/page-frame.html',
      token: '1691165795829227.971d75093c3981531d78002b316cb8dd953ff8f1'
    },
    body: JSON.stringify({
      cycle: 1,
      date
    })
  }).then(d => d.json())
}

!(async () => {
  const final = dayjs('2023-07-29');
  for (let i = 0; i < 70; i++) {

    const current = dayjs('2023-07-07').add(i, 'days');

    // 跳出循环
    if (current.unix() >= final.unix()) return;

    // 日期
    const date = current.format('YYYY-MM-DD')
    const res = await fetchData(date)
    const data = dec(res.data)
    console.log(`path ${date}`);

    const commercialHouse = []
    const previouslyOwnedHouse = []

    data.list.forEach(item => {
      // 新房
      const itemData = []
      itemData.push(item.region)
      itemData.push(item.new_deal_num + '套')
      itemData.push(item.new_deal_acreage + 'm²')
      itemData.push(item.new_deal_residential_num + '套')
      itemData.push(item.new_deal_residential_acreage + 'm²')

      commercialHouse.push(itemData)

      // 二手房
      const itemData2 = []
      itemData2.push(item.region)
      itemData2.push(item.deal_num + '套')
      itemData2.push(item.deal_acreage + 'm²')
      itemData2.push(item.deal_residential_num + '套')
      itemData2.push(item.deal_residential_acreage + 'm²')

      previouslyOwnedHouse.push(itemData2)
    })
    const patchData = {
      date,
      patch: true,
      availableHouse: [],
      commercialHouse,
      previouslyOwnedHouse
    }

    const filePath = new URL(`../assets/trade-${date}.json`, import.meta.url)
    fs.writeFileSync(filePath, JSON.stringify(patchData))
    console.log(`path ${date} done`);

    await sleep(3000 + Math.random() * 3000)
  }
  // {"date":"2022-06-22","timestamp":1655910612868,"availableHouse":[["上城","3905套","620231.27m²","1342套","193350.3m²"],["下城","2844套","507704.2m²","934套","97833.15m²"],["江干","6535套","1258011.32m²","755套","93039.61m²"],["拱墅","7512套","1046792.8m²","1513套","182226.7m²"],["西湖","4960套","560867.86m²","801套","110605.42m²"],["滨江","2244套","319780.24m²","826套","101337.9m²"],["之江","8525套","786167.11m²","55套","10353.6m²"],["萧山","19518套","2297683.69m²","6301套","730326.5m²"],["余杭","12958套","1636688.4m²","4869套","633913.28m²"],["钱塘新区","5295套","595822.26m²","2352套","256227.03m²"],["富阳","10699套","1114377.95m²","6510套","782958.65m²"],["桐庐","8249套","824282.87m²","4650套","559257.79m²"],["建德","4336套","408612.56m²","2204套","265413.03m²"],["淳安","9828套","1071153.58m²","6615套","757315.45m²"],["临安","16191套","1906645.78m²","11115套","1202134.7m²"],["合计","123599套","14954821.89m²","50842套","5976293.11m²"]],"commercialHouse":[["上城","26套","5932.91m²","21套","4374.3m²"],["下城","0套","0m²","0套","0m²"],["江干","15套","961.47m²","1套","106.06m²"],["拱墅","48套","5761.27m²","46套","5643.21m²"],["西湖","3套","519.53m²","1套","332.61m²"],["滨江","4套","378.31m²","2套","240.43m²"],["之江","7套","1001.41m²","3套","509.12m²"],["萧山","108套","15062.29m²","103套","14228.5m²"],["余杭","135套","14912.28m²","128套","14354.07m²"],["钱塘新区","46套","4453.81m²","37套","3929.06m²"],["富阳","10套","3031.03m²","7套","757.24m²"],["桐庐","14套","1552.99m²","6套","692.88m²"],["建德","17套","2387.09m²","15套","2129.86m²"],["淳安","7套","694.48m²","6套","645.68m²"],["临安","30套","3158.09m²","29套","2946.31m²"],["合计","470套","59806.96m²","405套","50889.33m²"]],"previouslyOwnedHouse":[["上城","4套","540.01m²","4套","540.01m²"],["下城","8套","533.06m²","7套","406.32m²"],["江干","21套","2144.71m²","20套","2114.88m²"],["拱墅","12套","815.94m²","11套","762.13m²"],["西湖","32套","2249.82m²","13套","1314.36m²"],["滨江","8套","1236.94m²","7套","953.14m²"],["之江","3套","346.81m²","2套","296.44m²"],["萧山","25套","2655.75m²","23套","2511.39m²"],["余杭","46套","4729.58m²","45套","4669.88m²"],["钱塘新区","14套","1115.43m²","11套","975.19m²"],["富阳","16套","1648.96m²","15套","1584.17m²"],["桐庐","13套","1188.97m²","10套","1112.45m²"],["建德","7套","541.35m²","6套","504.08m²"],["淳安","1套","64.81m²","1套","64.81m²"],["临安","6套","653.02m²","5套","647.1m²"],["合计","216套","20465.16m²","180套","18456.35m²"]]}
})()

// curl -H "Host: api.hangfang-data.com" -H "accept: */*" -H "content-type: application/json" -H "referer: https://servicewechat.com/wx7765bb88a39ee9cb/239/page-frame.html" -H "token: 1691165795829227.971d75093c3981531d78002b316cb8dd953ff8f1" -H "accept-language: en-US,en;q=0.9" -H "user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac" --data-binary "{\"cycle\":1,\"date\":\"2023-10-31\"}" --compressed "https://api.hangfang-data.com/statistics/get"
