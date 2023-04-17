function parseCSV(str) {
  var arr = [];
  var quote = false;
  let c, col;
  for (let row = (col = c = 0); c < str.length; c++) {
    var cc = str[c],
      nc = str[c + 1];
    arr[row] = arr[row] || [];
    arr[row][col] = arr[row][col] || "";

    if (cc == '"' && quote && nc == '"') {
      arr[row][col] += cc;
      ++c;
      continue;
    }
    if (cc == '"') {
      quote = !quote;
      continue;
    }
    if (cc == "," && !quote) {
      ++col;
      continue;
    }
    if (cc == "\r" && nc == "\n" && !quote) {
      ++row;
      col = 0;
      ++c;
      continue;
    }
    if (cc == "\n" && !quote) {
      ++row;
      col = 0;
      continue;
    }
    if (cc == "\r" && !quote) {
      ++row;
      col = 0;
      continue;
    }

    arr[row][col] += cc;
  }
  return arr;
}

function parseCSVtoObjects(csvString, /* optional */ columnNames) {
  var csvRows = parseCSV(csvString);

  var firstDataRow = 0;
  if (!columnNames) {
    columnNames = csvRows[0];
    firstDataRow = 1;
  }

  var result = [];
  for (var i = firstDataRow, n = csvRows.length; i < n; i++) {
    var rowObject = {};
    var row = csvRows[i];
    for (
      var j = 0, m = Math.min(row.length, columnNames.length);
      j < m;
      j++
    ) {
      var columnName = columnNames[j];
      var columnValue = row[j];
      rowObject[columnName] = columnValue;
    }
    result.push(rowObject);
  }
  return result;
}