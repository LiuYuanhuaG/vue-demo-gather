/*
 * @作者: 陈菲
 * @文件作用:file-helper  关于附件的辅助工具
 */
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

/**
 * 获取文件的 base64 字符串形式
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export function getFileBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * 测量文本的字符长度
 * @param {string} text
 * @returns {number}
 */
export function measureCharacterLengthOfText(text = "") {
  let len = 0;

  if (typeof text === "string") {
    for (let i = 0; i < text.length; i++) {
      if (text.charCodeAt(i) > 127 || text.charCodeAt(i) == 94) {
        len += 2;
      } else {
        len++;
      }
    }
  }

  return len;
}

/**
 * 处理前端文件上传时文件大小的展示（数据小于0.1M的时候按KB显示）
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE = (file) => {
  const size =
    file.size / 1024 / 1024 > 0.1
      ? `(${(file.size / 1024 / 1024).toFixed(1)}M)`
      : `(${(file.size / 1024).toFixed(1)}KB)`;
  return size;
};

/**
 * 处理前端文件上传类型的判断---ZIP
 *  @param {Object} file 文件数据
 */

export const UPLOAD_FILE_TYPE_ZIP = (file) => {
  if (["application/x-zip-compressed"].includes(file.type)) return true;

  return false;
};

/**
 * 处理前端文件上传大小--文档
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE_TYPE_DOCUMENT = (file) => {
  if (
    [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/pdf",
      "application/msword",
      "",
    ].includes(file.type)
  )
    return true;

  return false;
};

/**
 * 处理前端文件上传大小--视频
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE_TYPE_VIDEO = (file) => {
  if (["video/mp4", ""].includes(file.type)) return true;

  return false;
};

/**
 * 处理前端文件上传类型--图片
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE_TYPE_PHOTO = (file) => {
  if (
    ["image/jpeg", "image/png", "image/bmp", "image/jpg", ""].includes(
      file.type
    )
  )
    return true;

  return false;
};
/**
 * 处理前端文件上传大小--ZIP(上传文件大小大小不能超过 50MB)
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE_SIZE_ZIP = (file) => {
  if (file.size / 1024 / 1024 < 50) return true;

  return false;
};

/**
 * 处理前端文件上传大小--文档(上传文件大小大小不能超过 10MB)
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE_SIZE_DOCUMENT = (file) => {
  if (file.size / 1024 / 1024 < 10) return true;

  return false;
};
/**
 * 处理前端文件上传大小--视频(上传文件大小大小不能超过 20MB)
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE_SIZE_VIDEO = (file) => {
  if (file.size / 1024 / 1024 < 20) return true;

  return false;
};
/**
 * 处理前端文件上传大小--图片(上传文件大小大小不能超过 1MB)
 *  @param {Object} file 文件数据
 */
export const UPLOAD_FILE_SIZE_PHOTO = (file) => {
  if (file.size / 1024 / 1024 < 1) return true;

  return false;
};
