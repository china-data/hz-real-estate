
# 杭州历史房价数据

* 数据来源于：

https://fangjia.gotohui.com/fjdata-37

# 文件说明

* `index.js` 为抓取数据代码
* `origin.json` 为抓取数据后的原始数据
* `2018.json` 为手动处理的 2018 年 PC 端数据
* `2022.json` 为手动处理的 2022 年 PC 端数据
  * 无线端直接使用 2022 的地址获取不到，是空的。
* `data.json` 为手动处理后的较为干净的数据

# 2022 数据

  2022 年数据是从 https://fangjia.gotohui.com/fjdata-37 单独抓取处理的。

  处理代码如下：

```js
Array.from(document.querySelector('#zoushi .ntable').querySelectorAll(' tr')).map(
  t => ({
    m: t.children[1]?.innerText?.replace('月', '').trim(), // 月份
    n: t.children[2]?.innerText?.replace('元/㎡', '').trim(), // new 新房
    s: t.children[3]?.innerText?.replace('元/㎡', '').trim(), // second 二手房
  })
)
```

# 备注

* 2018 年的无线端数据有错误：https://m.gotohui.com/years/37/2018/ ，需要特殊处理
  * 所以需要使用 PC 端的数据：https://fangjia.gotohui.com/years/37/2018/
