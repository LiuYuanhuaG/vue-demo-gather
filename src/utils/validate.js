/*
 * @作者: 陈菲
 * @文件作用:正则验证
 */

/**
 * 电话号码
 * @param {* val}
 */

export const isMobile = (val) => {
  var phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  //手机号码
  if (phone.test(val)) {
    return true;
  }
  return false;
};

/**
 * 邮箱
 * @param {* val}
 */

export const isEmail = (val) => {
  var reg = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;
  if (reg.test(val)) {
    return true;
  }
  return false;
};

/**
 * 身份证正则
 * @param {* val}
 */

export const isCardNo = (card) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  const reg =
    /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
  if (reg.test(card)) {
    return true;
  }
  return false;
};

/**
 * 字符串中是否存在特殊字符
 * 存在返回true
 * @param str
 * @retun boolean
 */
export const isSymbol = (str) => {
  let specialChars =
    "~·`!！@#$￥%^…&*()（）—-_=+[]{}【】、|\\;:；：'\"“‘,./<>《》?？，。";
  let len = specialChars.length;
  for (let i = 0; i < len; i++) {
    if (str.indexOf(specialChars.substring(i, i + 1)) != -1) {
      return true;
    }
  }
  return false;
};

/**
 * 字符串中是否存在数字
 * 存在返回true
 * @param str
 * @retun boolean
 */
export const checkRate = (str) => {
  const reg = /\d/;
  if (reg.test(str)) {
    return true;
  }
  return false;
};

/**
 * 验证字符串中是否是数字
 * 是返回true
 * @param str
 * @retun boolean
 */
export const checkNumber = (str) => {
  const reg = /^[0-9]+.?[0-9]*$/;
  if (reg.test(str)) {
    return true;
  }
  return false;
};

/**
 * 判断是否小于100
 */
export const lessOneHundred = (num) => {
  var reg = /^((?!0)\d{1,2}|100)$/;
  // var reg = /^([1-9]|[1-9]\\d|100)$/;  这个也是可以
  if (!num.match(reg)) {
    return 0;
  } else {
    return num;
  }
};
