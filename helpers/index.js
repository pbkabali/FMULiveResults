export const getLeftPane = data => {
  let leftPane = [];
  for (let i = 6; i < data.length; i += 1) {
    let singleEntry = Object.values(data[i]);
    leftPane.push(singleEntry.slice(1, 5));
  }
  return leftPane;
};

export const getHeightArray = data => {
  //   let numberHeight = parseInt(data[1][1]);
  //   let heightArray = [];
  //   for (let i in data[0]) {
  //     heightArray.push(numberHeight);
  //   }
  //   return heightArray;
  let headerRow = Object.values(data[6]);
  let widthtArray = [];
  for (let i = 0; i < headerRow.length; i += 1) {
    widthtArray.push(headerRow[i].length * 7);
  }
  return widthtArray;
};

export const getTableData = data => {
  let tableData = [];
  for (let i = 6; i < data.length; i += 1) {
    let singleEntry = Object.values(data[i]);
    tableData.push(singleEntry.slice(8, singleEntry.length + 1));
  }
  return tableData;
};

export const getUrlData = data => {
  let urlRow1 = Object.values(data[0]);
  let urlRow2 = Object.values(data[1]);
  let urlArray = [];
  for (let i = 1; i < 8; i += 1) {
    urlArray.push(urlRow1[i]);
  }
  for (let i = 2; i < 8; i += 1) {
    urlArray.push(urlRow2[i]);
  }
  return urlArray;
};

export const getLinkData = data => {
  let linkRow1 = Object.values(data[2]);
  let linkRow2 = Object.values(data[3]);
  let linkArray = [];
  for (let i = 1; i < 8; i += 1) {
    linkArray.push(linkRow1[i]);
  }
  for (let i = 2; i < 8; i += 1) {
    linkArray.push(linkRow2[i]);
  }
  return linkArray;
};

export const getPositionArray = data => {
  let positionArray = [];
  for (let i = 6; i < data.length; i += 1) {
    let singleEntry = Object.values(data[i]);
    positionArray.push(singleEntry.slice(0, 1));
  }
  return positionArray;
};

export const getTotalTimeArray = data => {
  let totalTimeArray = [];
  for (let i = 6; i < data.length; i += 1) {
    let singleEntry = Object.values(data[i]);
    totalTimeArray.push(singleEntry.slice(7, 8));
  }
  return totalTimeArray;
};

export const getRallyName = data => Object.values(data[2])[8];

const dataBreakDown = data => [
  getLeftPane(data),
  getHeightArray(data),
  getTableData(data),
  getUrlData(data),
  getLinkData(data),
  getPositionArray(data),
  getTotalTimeArray(data),
  getRallyName(data)
];

export default dataBreakDown;
