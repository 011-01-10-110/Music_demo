import http from './axios';

// 推荐歌单
export function getPersonalized(params){
    return http.get('/personalized',{params})
}

// 推荐歌曲
export function getNewsong(params){
    return http.get('/personalized/newsong',{params})
}

// 热歌榜
export function getHotrank(params){
    return http.get('/top/list',{params})
}

// 热搜列表
export function getHotsearch(params){
    return http.get('/search/hot',{params})
}

// 轮播图
export function getBanner(){
    return http.get('/banner')
}

// 歌单详情
export function getDetail(params){
    return http.get('/playlist/detail',{params})
}

// 歌曲详情
export function getsongDetail(params){
    return http.get('/song/detail',{params})
}

// 获取歌词
export function getLyric(params){
    return http.get('/lyric',{params})
}

// 获取歌曲
export function getsongUrl(params){
    return http.get('/song/url',{params})
}

// 搜索提示
export function getSuggest (params){
    return http.get('/search/suggest',{params})
}

// 搜索结果
export function getSearch(params){
    return http.get('/search',{params})
}