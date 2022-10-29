!(async () => {
  const result = [];
  for (let year = 2011; year <= 2021; year++) {
    var html = await fetch(`https://m.gotohui.com/years/37/${year}/`).then(d =>
      d.text()
    );
    var container = document.createElement('div');
    container.innerHTML = html;

    result.push({
      year,
      list: Array.from(container.querySelector('.houserate .ntable').querySelectorAll(' tr')).map(
        t => ({
          m: t.children[0]?.innerText?.replace('月', '').trim(), // 月份
          s: t.children[1]?.innerText?.replace('元/㎡', '').trim(), // second 二手房
          n: t.children[2]?.innerText?.replace('元/㎡', '').trim(), // new 新房
        })
      ),
    });
  }

  window.result = result;
  console.log(result);
})();
