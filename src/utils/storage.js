// 统一 对LocalStorage 做json存取操作
// 1. 存储数据----------------
export const setItem = function (key, dataObj) {
    // 如果 数据 是 对象或数组 则转换为json字符串
    if (typeof dataObj === 'object') {
        dataObj = JSON.stringify(dataObj)
    }
    // 将 数据 保存到 LocalStorage
    localStorage.setItem(key, dataObj)
}

// 2. 取出数据------------------------------------------
export const getItem = function (key) {
    // 本地数据值类型：null, json字符串，普通字符串
    let dataStr = localStorage.getItem(key)

    try {
        // 对 字符串 进行 json转换 成 对象/数组，并返回
        return JSON.parse(dataStr)
    } catch (error) {
        // 如果转换失败，则 直接返回 读取的 值
        return dataStr
    }
}

// 3.删除数据------------------------------------------
export const removeItem = function (key) {
    localStorage.removeItem(key)
}