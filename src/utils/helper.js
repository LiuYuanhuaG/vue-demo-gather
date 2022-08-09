/*
 * @作者: 陈菲
 * @文件作用:helper - 辅助工具
 */
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import axios from 'axios'
import { ElMessage } from 'element-plus';
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import { BASE_FILE_NAME } from "./request";

/**
 * 度 转 度分秒
 */
export function degree2dms (degree) {
  const _degree = parseInt(degree);
  const minutes = parseInt(("." + String(degree).split(".")[1]) * 60);
  const seconds = parseInt(
    ("." + String(("." + String(degree).split(".")[1]) * 60).split(".")[1]) * 60
  );

  return `${_degree || "0"}°${minutes || "00"}′${seconds || "00"}″`;
}

/**
 * 根据身份证号获取生日
 * @param idCard
 */
export function getBirthdayByIdCard (idCard) {
  if (idCard.length === 15) {
    return [
      "19" + idCard.substr(6, 2),
      idCard.substr(8, 2),
      idCard.substr(10, 2),
    ].join("-");
  } else if (idCard.length === 18) {
    return [
      idCard.substr(6, 4),
      idCard.substr(10, 2),
      idCard.substr(12, 2),
    ].join("-");
  }

  return "";
}

/**
 * 根据身份证号获取性别
 * @param idCard
 */
export function getSexByIdCard (idCard) {
  if (idCard.length === 15) {
    return ["女", "男"][idCard.substr(14, 1) % 2];
  } else if (idCard.length === 18) {
    return ["女", "男"][idCard.substr(16, 1) % 2];
  }

  return "";
}

/**
 * 根据身份证号获取性别和年龄
 * @param idCard
 */
export function analyzeIDCard (IDCord) {
  var sexAndAge = {};
  //获取用户身份证号码
  var userCard = IDCord;
  //如果用户身份证号码为undefined则返回空
  if (!userCard) {
    return sexAndAge;
  }

  // 获取性别
  if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
    sexAndAge.sex = "男";
  } else {
    sexAndAge.sex = "女";
  }

  // 获取出生日期
  var yearBirth = userCard.substring(6, 10);
  var monthBirth = userCard.substring(10, 12);
  var dayBirth = userCard.substring(12, 14);
  // 获取当前年月日并计算年龄
  var myDate = new Date();
  var monthNow = myDate.getMonth() + 1;
  var dayNow = myDate.getDate();
  var age = myDate.getFullYear() - yearBirth;
  if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
    age--;
  }
  // 得到年龄
  sexAndAge.age = age;
  // 返回 性别和年龄
  return sexAndAge;
}

/**
 * 删除对象中的空值
 */
export function deleteEmpty (obj = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (!value && value !== 0 && value !== false) {
      delete obj[key];
    }
  }
}

/**
 * 删除对象中的-1
 */
export function deleteOne (obj = {}) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === -1) {
      delete obj[key];
    }
  }
}

/**
 * 直接根据链接下载
 */
export const downloadDirect = (url) => {
  const aTag = document.createElement("a");

  aTag.download = url.split("/").pop();
  aTag.href = url;
  aTag.click();
};

/**
 * 通过内容生成blob对象下载
 */
export const downloadByContent = (content, filename, type) => {
  const aTag = document.createElement("a");

  aTag.download = filename;

  const blob = new Blob([content], {
    type,
  });
  const blobUrl = URL.createObjectURL(blob);

  aTag.href = blobUrl;
  aTag.click();
  URL.revokeObjectURL(blobUrl);
};

/**
 * 通过base64下载
 */
export const downloadByDataURL = (content, filename, type) => {
  const aTag = document.createElement("a");

  aTag.download = filename;

  const dataUrl = `data:${type};base64,${window.btoa(
    unescape(encodeURIComponent(content))
  )}`;

  aTag.href = dataUrl;
  aTag.click();
};

/**
 * 通过blob下载
 */
export const downloadByBlob = (blob, filename) => {
  const aTag = document.createElement("a");

  aTag.download = filename;

  const blobUrl = URL.createObjectURL(blob);

  aTag.href = blobUrl;
  aTag.click();
  URL.revokeObjectURL(blobUrl);
};

/**
 * base64转url预览
 */
export function blobUrl (base64, fileType = null) {
  let arr = base64.split(",");
  //注意base64的最后面中括号和引号是不转译的
  let _arr = arr[1].substring(0, arr[1].length - 2);
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = window.atob(_arr); //base64解码
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  let blob = new Blob([u8arr], {
    type: mime || fileType,
  });

  let url = URL.createObjectURL(blob);
  window.open(url);
  return url;
}
/**
 * base64转blob
 */
export const base64ToBlob = (base64, type) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const buffer = Uint8Array.from(byteNumbers);
  const blob = new Blob([buffer], {
    type,
  });

  return blob;
};

// 导出excel
export const exportExcel = async (
  columns,
  exclude,
  data,
  excelName,
  message = () => { }
) => {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet(excelName, {
    views: [
      {
        showGridLines: true,
      },
    ],
  });
  const headerCell = new Array(columns?.length ?? 99).fill("A");
  const headers = columns
    .map((item) => {
      if (!exclude.includes(item.dataIndex)) {
        return {
          header: item.title,
          key: item.dataIndex,
        };
      }
    })
    .filter(Boolean);

  sheet.columns = headers;
  headers.forEach((_, index) => {
    sheet.getCell(String(headerCell[index]) + String(1)).font = {
      bold: true,
    };
  });
  data.forEach((item) => {
    sheet.addRow(item);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buffer]), `${excelName}.xlsx`);
  message({
    type: "success",
    message: "导出成功!",
  });
};

export const exportExcels = async (
  columns,
  exclude,
  data,
  excelName,
  message = () => { },
  headerNumber = 1
) => {
  // const loading = message.loading("正在导出...", 0)

  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet(excelName, {
    views: [
      {
        showGridLines: true,
      },
    ],
  });
  const headerCell = new Array(columns?.length ?? 99).fill("A");
  const headers = columns
    .map((item) => {
      if (!exclude.includes(item.dataIndex)) {
        return {
          header: item.title,
          key: item.dataIndex,
          child: item.child,
        };
      }
    })
    .filter(Boolean);

  sheet.columns = headers;
  headers.forEach((_, index) => {
    sheet.getCell(String(headerCell[index]) + String(1)).font = {
      bold: true,
    };
  });
  data.forEach((item) => {
    sheet.addRow(item);
  });

  const buffer = await workbook.xlsx.writeBuffer();

  saveAs(new Blob([buffer]), `${excelName}.xlsx`);
  message({
    type: "success",
    message: "导出成功!",
  });
};

/**
 *
 * 处理单个文件上传时的数据
 */
export const singleUploadProcess = ({ names = [], values = {} }) => {
  for (let i = 0; i < names.length; i++) {
    const currentName = names[i];

    if (
      currentName in values &&
      Object.prototype.toString.call(values[currentName]) ===
      "[object Object]" &&
      values[currentName].fileList?.length &&
      values[currentName].fileList[
      values[currentName].fileList.length - 1
      ] instanceof File
    ) {
      values[currentName] =
        values[currentName].fileList[values[currentName].fileList.length - 1];
    } else if (
      currentName in values &&
      Object.prototype.toString.call(values[currentName]) ===
      "[object Object]" &&
      values[currentName].fileList?.length &&
      values[currentName].fileList[values[currentName].fileList.length - 1]
        ?.originFileObj instanceof File
    ) {
      values[currentName] =
        values[currentName] &&
        Object.prototype.toString.call(values[currentName]) ===
        "[object Object]" &&
        values[currentName].fileList[values[currentName].fileList.length - 1]
          ?.originFileObj;
    } else {
      delete values[currentName];
    }
  }
};

/**
 *
 * 处理多个文件上传时的数据
 */
export const multipleUploadProcess = ({ names = [], values = {} }) => {
  for (let i = 0; i < names.length; i++) {
    const currentName = names[i];

    const allFiles = [];

    if (
      currentName in values &&
      Object.prototype.toString.call(values[currentName]) ===
      "[object Array]" &&
      values[currentName]?.length
    ) {
      for (let j = 0; j < values[currentName].length; j++) {
        if (values[currentName][j] instanceof File) {
          allFiles.push(values[currentName][j]);
        } else if (values[currentName][j].originFileObj instanceof File) {
          allFiles.push(values[currentName][j].originFileObj);
        }
      }

      values[currentName] = allFiles;
    } else {
      delete values[currentName];
    }
  }
};

/**
 * 处理moment为字符串格式
 */
export const dateBatchFormat = ({ values = {}, formatter = "YYYY-MM-DD" }) => {
  for (const [key, value] of Object.entries(values)) {
    if (isMoment(value)) {
      values[key] = moment(values[key]).format(formatter);
    }
  }
};

/**
 * 处理后端返回的日期为moment格式
 */
export const dateBatchParse = ({ names = [], values = {} }) => {
  for (let i = 0; i < names.length; i++) {
    const currentName = names[i];

    values[currentName] = values[currentName]
      ? moment(values[currentName])
      : "";
  }
};

export const dateParse = (date = "") => {
  return date ? moment(date) : "";
};

export const dateFormat = ({ day, formatter = "YYYY-MM-DD" }) => {
  if (isMoment(day)) {
    return day.format(formatter);
  }

  return "";
};

/**
 * 处理时间区间数据为字段形式并返回
 */
export const rangeDateFormat = ({
  rangeArr,
  values,
  formatter = "YYYY-MM-DD",
}) => {
  if (Array.isArray(values[rangeArr]) && values[rangeArr].length === 2) {
    const startTime = values[rangeArr][0].format(formatter);
    const endTime = values[rangeArr][1].format(formatter);

    return {
      startTime,
      endTime,
    };
  } else {
    return {
      startTime: "",
      endTime: "",
    };
  }
};

/* Echarts图表尺寸自适应 */
export const fitChartSize = (size, defalteWidth = 1920) => {
  let clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth) return size;
  let scale = clientWidth / defalteWidth;
  return Number((size * scale).toFixed(3));
};



/**
 * 下载文件 可换名
 * @param {*} url
 * @param {*} fileName
 */

export function handleDownload (url, fileName) {
  /**
   * 获取 blob
   * @param  {String} url 目标文件地址
   * @return {cb}
   */
  function getBlob (url, cb) {

    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {

      if (xhr.status === 200) {
        cb(xhr.response)
      }
    }
    xhr.send()
    return xhr
  }

  /**
   * 保存
   * @param  {Blob} blob
   * @param  {String} filename 想要保存的文件名称
   */
  function saveAss (blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      var link = document.createElement('a')
      var body = document.querySelector('body')

      link.href = window.URL.createObjectURL(blob)
      link.download = filename

      // fix Firefox
      link.style.display = 'none'
      body.appendChild(link)

      link.click()
      body.removeChild(link)

      window.URL.revokeObjectURL(link.href)
    }
  }

  try {
    let xhr = getBlob(url, (blob) => {
      saveAss(blob, fileName)
    })
    if (xhr.status == 0 || xhr.status == 200) {
      return true
    } else {
      return false
    }

  } catch (err) {
    return err
  }
}




const getFile = url => {
  return new Promise((resolve, reject) => {
    let obj = {
      method: 'get',
      url,
      responseType: 'blob'
      // responseType: 'arraybuffer'
    }
    axios(obj)
      .then(data => {
        resolve(data.data)
      })
      .catch(error => {
        reject(error.toString())
      })
  })
}


/**
 * 以压缩包形式下载
 * 传入参数(数据，名字，提示信息可选)
 *
 */
export const zipDownload = (data1 = [], zipName = '文件',) => {
  const zip = new JSZip()
  const cache = {}
  const promises = []
  ElMessage.success('正在下载中请稍等。。。')
  data1.forEach(item => {
    const promise = getFile(item.url).then(data => {
      zip.file(item.title, data, { binary: true }) // 逐个添加文件
      cache[item.title] = data

    })
    promises.push(promise)
  })

  Promise.all(promises).then(() => {
    zip.generateAsync({ type: 'blob' }).then(content => {
      // 生成二进制流
      FileSaver.saveAs(content, `${zipName}.zip`) // 利用file-saver保存文件  自定义文件名
    })
  }, (err) => {
    ElMessage && ElMessage.error('网络错误，请稍后重试！')
  })
}

/**
 * 获取可代理的url
 * 传入参数(url)
 *
 */
export const getUrl = (url) => {
  let ter = url.split("/file");
  return `/file/${ter[ter.length - 1]}`
}
