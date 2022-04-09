/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

export function isEmpty(value) {
  return !value && value !== false && value !== 0
}

export function clearEmptyValue(data, deleteOldData) {
  var newData = {}
  for (var key in data) {
    if (!isEmpty(data[key])) {
      newData[key] = data[key]
    } else if (deleteOldData) {
      delete data[key]
    }
  }
  return newData
}

export function deepClone(obj) {
  var result; var oClass = isClass(obj)
  // 确定result的类型
  if (oClass === 'Object') {
    result = {}
  } else if (oClass === 'Array') {
    result = []
  } else {
    return obj
  }
  for (var key in obj) {
    var copy = obj[key]
    if (isClass(copy) == 'Object') {
      result[key] = deepClone(copy)// 递归调用
    } else if (isClass(copy) == 'Array') {
      result[key] = deepClone(copy)
    } else {
      result[key] = obj[key]
    }
  }
  return result
}

export function isClass(o) {
  if (o === null) return 'Null'
  if (o === undefined) return 'Undefined'
  return Object.prototype.toString.call(o).slice(8, -1)
}

/**
 * @param {Object} searchParams 请求参数对象
 * @return {Object} 过滤后的参数对象将 '' 空字符串属性值转换为null
 */
export function formatSearchParams(searchParams) {
  for (const key in searchParams) {
    if (typeof searchParams[key] === 'string' && searchParams[key].trim() === '' || searchParams[key]?.length === 0) {
      searchParams[key] = null
    }
  }

  return searchParams
}

/**
 * @return {Date} 获取明天的日期
 */
export function getTomorrowDate() {
  const today = new Date()
  today.setTime(today.getTime() + 24 * 60 * 60 * 1000)
  return today
}

/**
 * @param {Integer}
 * @return {Date} 获取距离今天days天的日期
 */
export function getAnyDate(days) {
  const today = new Date()
  today.setTime(today.getTime() + days * 24 * 60 * 60 * 1000)
  return parseTime(today, '{y}-{m}-{d}')
}

/**
 *
 * @param {String} date
 * @return {Integer} 获传入日期相对于当前日期的天数差(传入日期在当前时间之前返回正数，反之返回负数)
 */
export function getDateDuration(date) {
  const today = new Date().getTime()
  const otherDate = new Date(date).getTime()
  return parseInt((today - otherDate) / (24 * 60 * 60 * 1000))
}

/**
 *
 * @param {String} date
 * @return {Integer} 获传入日期相对于当前日期的年数差(传入日期年份在当前年份之前返回正数，反之返回负数)
 */
export function getYearDuration(date) {
  const thisYear = new Date().getFullYear()
  const otherYear = new Date(date).getFullYear()
  return thisYear - otherYear
}

export function bindDocumentEnterKeyDown(value) {
  // 按回车键进行搜索
  document.onkeydown = e => {
    if (e.keyCode === 13) {
      value()
    }
  }
}
