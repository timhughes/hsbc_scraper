;(function($, undefined) {
(function (console) {
  console.save = function (data, filename) {
    if (!data) {
      console.error('Console.save: No data');
      return;
    }
    if (!filename) filename = 'console.json';
    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4);
    }
    var blob = new Blob([data], {
      type: 'text/json'
    }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = [
      'text/json',
      a.download,
      a.href
    ].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
  };
}) (console);
if (!Date.prototype.toISODateString) {
  (function () {
    function pad(number) {
      if (number < 10) {
        return '0' + number;
      }
      return number;
    }
    Date.prototype.toISODateString = function () {
      return this.getUTCFullYear() +
      '-' + pad(this.getUTCMonth() + 1) +
      '-' + pad(this.getUTCDate());
    };
  }());
}
function deepTrim(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] == 'string') {
        var trimmedProp = prop.replace(/\\n/g, '').trim();
        obj[trimmedProp] = obj[prop].replace(/\\n/g, ' ').trim();
        if (trimmedProp != prop) {
          delete obj[prop];
        }
      } else if (typeof obj[prop] == 'object') {
        deepTrim(obj[prop]);
      }
    }
  }
}
function processData(data) {
  deepTrim(data);
  data.splice(0, 4);
  return data
}
function getStatementDate() {
  statement_date_string = artoo.scrape('.hsbcTextRight', 'text'
  ) [0];
  date = new Date(statement_date_string);
  return date.toISODateString();
};
function getAccountNumber() {
  acct_num_string = artoo.scrape('.hsbcTextRight', 'text'
  ) [1];
  num = acct_num_string.substr(acct_num_string.length - 14);
  return num;
};
function getTransactions() {
  transactions = artoo.scrapeTable('.hsbcMainContent', {
    headers: 'th',
  });
  return processData(transactions);
};
data = {
  'statement_date': getStatementDate(),
  'account_number': getAccountNumber(),
  'transactions': getTransactions()
}
console.save(data, data['account_number'].concat('_', data['statement_date'], '.json'));

}).call(this, artoo.$);
