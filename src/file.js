/**
 * File & Image Utilities
 * Tools for base64 conversion, preloading, and file extension handling.
 */

/**
 * Convert File/Blob to Base64
 * @param {File|Blob} file
 * @returns {Promise<string>}
 */
export const toBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(/** @type {string} */ (reader.result));
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Preload an image URL
 * @param {string} url
 * @returns {Promise<void>}
 */
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve();
    img.onerror = () => reject();
  });
};

/**
 * Get file extension from filename
 * @param {string} filename
 * @returns {string}
 */
export const getFileExtension = (filename) => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

/**
 * Check if file is an image
 * @param {File} file
 * @returns {boolean}
 */
export const isImage = (file) => {
  return file && file.type.startsWith("image/");
};

/**
 * Calculate human-readable file size
 * @param {number} bytes
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
