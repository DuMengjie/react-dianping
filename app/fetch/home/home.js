import { get } from '../get'

// 获取广告数据
export function getAdData() {
    const result = get('/api/homead')
    return result
}

// 获取列表数据
export function getListData(city, page) {
    const result = get('/api/homelist/' + encodeURIComponent(city) + '/' + page)
    return result
}