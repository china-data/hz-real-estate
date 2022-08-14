const fetch = require("node-fetch");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const moment = require("moment");
const fs = require("fs");
const path = require("path");

!(async () => {
  const date = moment().format("YYYY-MM-DD");
  const code = '330106'; // 西湖区

  let page = 1;

  while(true) {

    const fileName = path.join(__dirname, `../assets-second/${date}-${code}-${page}.json`);
    if (fs.existsSync(fileName)) {
      page++;
      continue;
    }
    const res = await fetch(
      "https://zwfw.fgj.hangzhou.gov.cn/jjhygl/webty/WebFyAction_getGpxxSelectList.jspx",
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Cookie": "HZSESSIONID=4a4099a2-915e-4f9d-87b5-8673997871ab; JSESSIONID=B4A37F5509DA29F469ECB2E9A5BB12FA; zh_choose_undefined=s; Hm_lvt_70e93e4ca4be30a221d21f76bb9dbdfa=1660471627; Hm_lpvt_70e93e4ca4be30a221d21f76bb9dbdfa=1660473578"
        },
        referrer:
          "https://zwfw.fgj.hangzhou.gov.cn/jjhygl/webty/gpfy/gpfySelectlist.jsp",

        body:`gply=1&wtcsjg=&jzmj=&ordertype=&fwyt=&hxs=&xzqh=33&secondxzqh=${code}&wtcsjgMin=&wtcsjgMax=&starttime=&endtime=&keywords=&page=${page}&xqid=0`,
        method: "POST",
      }
    ).then(d => d.json());

    console.log(`writeFileSync ${fileName}`);

    fs.writeFileSync(fileName, JSON.stringify(res));

    if (res.list && res.list.length < 10) {
      break;
    }

    if (page * 10 > res.totaltows) {
      break;
    }

    page++;
  }
})();
