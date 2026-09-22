// ==============================
// 读取搜索关键词
// ==============================

const params = new URLSearchParams(window.location.search);
const query = params.get("q")?.trim() || "";

const queryDisplay = document.getElementById("search-query");
const countDisplay = document.getElementById("search-count");
const messageDisplay = document.getElementById("search-message");
const resultsDisplay = document.getElementById("search-results");

if (queryDisplay) {
  queryDisplay.textContent = query;
}


// ==============================
// 搜索资料
// ==============================

const searchData = {

  "亚历山大": {
    type: "broad",

    message: `
      <p>检索到大量可能相关的结果。</p>
      <p>“亚历山大”是一个较为常见的人名，仅凭现有关键词无法确认您所查找的对象。</p>
      <p>建议增加姓氏、地区、职业或其他相关信息以缩小检索范围。</p>
    `,

    results: []
  },

  "亚历山大·格莱修": {
    type: "results",

    message: `
      <p>检索到若干可能相关的公开资料。</p>

      <p>
        <span class="name">亚历山大·雷内·格莱修</span>
        是活跃于20世纪中期的法国投资人及慈善事业资助者，
        出身于普罗旺斯地区艾克斯的格莱修家族。
      </p>

      <p>
        现存公开资料中可见数篇关于格莱修家族及冰川基金会的旧报刊报道，
        以及数张格莱修先生接受采访或出席公共活动时拍摄的照片。
      </p>
    `,

    results: [
      {
        number: "PUB-1945-001",
        title: "为重建地方生活 格莱修先生宣布设立长期救济基金",
        link: "/archives/pub-1945-001.html"
      }

    ]
  },

  "亚历山大·雷内·格莱修": {
    alias: "亚历山大·格莱修"
  },

  "alexandre glacieux": {
    alias: "亚历山大·格莱修"
  },

  "alexandre rené glacieux": {
    alias: "亚历山大·格莱修"
  },

  "奥伯拉丁的回归": {
    type: "message",

    message: `
      <p>一款于2018年发行的解谜游戏。</p>
      <p>
        来自司书A.S.的留言：
        为了不造成剧透我不想透露太多，我只用我的名誉保证绝对好玩。
      </p>
    `,

    results: []
  },

  "奥伯拉丁": {
    alias: "奥伯拉丁的回归"
  },

  "type help": {
    type: "message",

    message: `
      <p>一款于2025年发行的解谜游戏。</p>
      <p>
        <span class="name">[A.S.]</span>
        HTML解谜实在是很有趣！是的，这个网站的设计就是借鉴于此。
      </p>
    `,

    results: []
  }
};

function normalizeQuery(text) {
  return text
    .trim()
    .toLowerCase();
}


// ==============================
// 查找搜索资料
// ==============================

function findSearchData(query) {
  const normalizedQuery = normalizeQuery(query);

  for (const key in searchData) {
    if (normalizeQuery(key) === normalizedQuery) {
      const data = searchData[key];

      if (data.alias) {
        return searchData[data.alias];
      }

      return data;
    }
  }

  return null;
}


// ==============================
// 创建一条搜索结果
// ==============================

function createSearchResult(result) {
  const item = document.createElement("p");
  item.classList.add("search-result");

  const link = document.createElement("a");

  link.href = result.link;
  link.textContent = `[${result.number}] ${result.title}`;

  item.appendChild(link);

  return item;
}


// ==============================
// 显示搜索结果
// ==============================

function renderResults(data) {

  if (resultsDisplay) {
    resultsDisplay.innerHTML = "";
  }


  // 没有匹配结果
  if (!data) {
    if (countDisplay) {
      countDisplay.textContent = "0 RESULTS FOUND";
    }

    if (messageDisplay) {
      messageDisplay.innerHTML = `
        <p>未找到与该查询相关的公开记录。</p>
      `;
    }

    return;
  }


  // 搜索词过于宽泛
  if (data.type === "broad") {
    if (countDisplay) {
      countDisplay.textContent = "RESULTS TOO BROAD";
    }

    if (messageDisplay) {
      messageDisplay.innerHTML = data.message;
    }

    return;
  }
if (data.type === "message") {
  if (countDisplay) {
    countDisplay.textContent = "";
  }

  if (messageDisplay) {
    messageDisplay.innerHTML = data.message;
  }

  return;
}

  const resultCount = data.results.length;

  if (countDisplay) {
    countDisplay.textContent =
      `${resultCount} RESULT${resultCount === 1 ? "" : "S"} FOUND`;
  }

  if (messageDisplay) {
    messageDisplay.innerHTML = data.message;
  }

  if (resultsDisplay) {
    data.results.forEach(result => {
      resultsDisplay.appendChild(
        createSearchResult(result)
      );
    });
  }
}


// ==============================
// 执行搜索
// ==============================

if (!query) {

  if (countDisplay) {
    countDisplay.textContent = "NO QUERY";
  }

  if (messageDisplay) {
    messageDisplay.innerHTML = `
      <p>请输入搜索关键词。</p>
    `;
  }

} else {

  const data = findSearchData(query);

  renderResults(data);
}