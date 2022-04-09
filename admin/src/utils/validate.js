/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLoginName(str) {
  return str.trim().length > 0
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validMobile(str) {
  return str.trim().length == 11 && str.trim().substring(0, 1) == '1'
}
