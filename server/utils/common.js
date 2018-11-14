const moment = require('moment');

module.exports = {
  today: format => {
    return moment(new Date()).format(format);
  },
  isEmpty: value => checkEmpty(value),
  content: (res_data, res_status = '1000', res_msg = {}) => {
    let res_data_count = 0;
    const empty = checkEmpty(res_data);

    if (!empty) {

      //console.log(typeof res_data);
      //console.log(res_data.constructor);
      // && res_data.constructor === Object

      // checking data-type
      //https://webbjocke.com/javascript-check-data-types/

      if (typeof res_data === 'object' && res_data.constructor === Array) {
        res_data_count = res_data.length;
      } else if (typeof res_data === 'object') {
        res_data_count = Object.keys(res_data).length > 0 ? 1 : 0;
      } else if (typeof res_data === 'string') {
        res_data_count = -1;
      }
    }

    return {
      res_status,
      res_data_count,
      res_data,
      res_msg
    };
  },
  error_content: (err_data) => {
    if (typeof err_data === 'object') 
      return { error_yn: 'Y', error_msg: err_data.message }
    else if (typeof err_data === 'string')
      return { error_yn: 'Y', error_msg: err_data }
    return { error_yn: 'N', error_msg: ''}
  },
  log: (log_text) => {
    console.log(log_text);
  },
  isEmpty: checkEmpty
};

function checkEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}


// res_option: {
//   pagination_use_yn: 'N',
//     pagination_total_count: 1
// }