const ARCHIVE_STORAGE_KEY = "glacieuxArchiveDiscovered";


const archiveFiles = [

  {
    id: "PUB-1945-001",
    year: 1945,
    title: "为重建地方生活 格莱修先生宣布设立长期救济基金",
    type: "新闻",
    url: "../archives/pub-1945-001.html",
    defaultUnlocked: true
  },

  {
    id: "PUB-1950-001",
    year: 1950,
    title: "格莱修基金会启用“冰川基金会”新名　宣布长期支持南极科学事业",
    type: "新闻",
    url: "../archives/pub-1950-001.html",
    defaultUnlocked: true
  },

  {
    id: "REP-1940-01",
    year: 1940,
    title: "巴黎事件调查记录",
    type: "调查报告",
    url: "../archives/rep-1940-01.html",
    defaultUnlocked: false
  },

  {
    id: "COR-1940-02",
    year: 1940,
    title: "未公开私人通信摘录",
    type: "通信",
    url: "../archives/cor-1940-02.html",
    defaultUnlocked: false
  }

];



function getDiscoveredArchives() {

  let saved = [];

  try {

    saved = JSON.parse(
      localStorage.getItem(ARCHIVE_STORAGE_KEY)
    ) || [];

  }

  catch {

    saved = [];

  }


  const defaultFiles = archiveFiles
    .filter(file => file.defaultUnlocked)
    .map(file => file.id);


  const discovered = [
    ...new Set([
      ...saved,
      ...defaultFiles
    ])
  ];


  localStorage.setItem(
    ARCHIVE_STORAGE_KEY,
    JSON.stringify(discovered)
  );


  return discovered;
}



function unlockArchive(fileId) {

  const file = archiveFiles.find(
    file => file.id === fileId
  );


  if (!file) {

    console.warn(`Unknown archive: ${fileId}`);

    return false;

  }


  const discovered = getDiscoveredArchives();


  if (discovered.includes(fileId)) {

    return false;

  }


  discovered.push(fileId);


  localStorage.setItem(
    ARCHIVE_STORAGE_KEY,
    JSON.stringify(discovered)
  );


  renderArchiveShelf();


  return true;
}



function renderArchiveShelf() {

  const shelf =
    document.getElementById("archive-shelf");


  if (!shelf) {
    return;
  }


  shelf.innerHTML = "";


  const discovered =
    getDiscoveredArchives();


  const visibleFiles = archiveFiles
    .filter(file => discovered.includes(file.id))
    .sort((a, b) => {

      if (a.year !== b.year) {
        return a.year - b.year;
      }

      return a.id.localeCompare(b.id);

    });


  const filesByYear = {};


  visibleFiles.forEach(file => {

    if (!filesByYear[file.year]) {

      filesByYear[file.year] = [];

    }


    filesByYear[file.year].push(file);

  });


  Object.entries(filesByYear)
    .sort(
      ([yearA], [yearB]) =>
        Number(yearA) - Number(yearB)
    )
    .forEach(([year, files]) => {

      createYearSection(
        shelf,
        year,
        files
      );

    });

}



function createYearSection(
  shelf,
  year,
  files
) {

  const section =
    document.createElement("section");

  section.className = "index-section";

  section.dataset.year = year;


  const heading =
    document.createElement("h2");

  heading.textContent = year;


  const wrapper =
    document.createElement("div");

  wrapper.className = "table-wrapper";


  const table =
    document.createElement("table");

  table.className = "index-table archive-index-table";


  table.innerHTML = `
    <thead>
      <tr>
        <th>档案编号</th>
        <th>标题</th>
        <th>类型</th>
      </tr>
    </thead>

    <tbody></tbody>
  `;


  const tbody =
    table.querySelector("tbody");


  files.forEach(file => {

    const row =
      document.createElement("tr");


    const idCell =
      document.createElement("td");

    idCell.textContent = file.id;


    const titleCell =
      document.createElement("td");


    const link =
      document.createElement("a");

    link.href = file.url;

    link.textContent = file.title;


    titleCell.appendChild(link);


    const typeCell =
      document.createElement("td");

    typeCell.textContent = file.type;


    row.append(
      idCell,
      titleCell,
      typeCell
    );


    tbody.appendChild(row);

  });


  wrapper.appendChild(table);


  section.append(
    heading,
    wrapper
  );


  shelf.appendChild(section);

}



renderArchiveShelf();