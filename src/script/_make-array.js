/**
 * document.querySelectorAllなどで取得したdomをmapとかで回す時に使う
 * @param {object} obj - document.querySelectorAllなどで取得したオブジェクト
 */
export const makeArray = obj => {
  const isArray = array => {
    if (Array.isArray) {
      return Array.isArray(array);
    }
    return Object.prototype.toString.call(array) === '[object Array]';
  };

  const isNumber = num =>
    typeof num === typeof 1 && num !== null && isFinite(num);

  const array = [];
  if (isArray(obj)) {
    return obj;
  } else if (obj && isNumber(obj.length)) {
    // convert nodeList to array
    for (let i = 0, num = obj.length; i < num; i++) {
      array[i] = obj[i];
    }
  } else {
    array.push(obj);
  }
  return array;
};
