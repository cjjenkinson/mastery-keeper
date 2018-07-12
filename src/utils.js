export default {
  formatRawHours: (hoursRaw) => {
    const date = new Date(hoursRaw * 3600 * 1000);

    return (
      `${(`${date.getUTCHours()}`).slice(-2)
      } hours ${
        (`0${date.getUTCMinutes()}`).slice(-2)
      } minutes`
    );
  },

  formatNumber: (number) => {
    let str = '';

    if (typeof number === 'number') {
      str = number.toString();
    } else {
      str = number;
    }

    const r = parseInt(str.replace(/[^\d]+/gi, ''), 10);
    return r ? r.toLocaleString('en') : '';
  },
};
