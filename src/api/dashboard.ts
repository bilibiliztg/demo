import { post, get} from "../utils/http"
enum Api {
    GET_LINE_STATISTIC = '/getLineStatistic',
    GET_GRAPH_STATISTIC = '/getGraphStatistic',
    GET_LEIDA_GRAPH = '/leidaGraph',
    TOP_CITY_RANK = '/topCityRank',
}


function getLineStatistic(){
    return get(Api.GET_LINE_STATISTIC)
}  


function getGraphStatistic(){
    return get(Api.GET_GRAPH_STATISTIC)
}  

function getLeidaGraph(){
    return get(Api.GET_LEIDA_GRAPH)
}  
function getTopCityRank(){
    return get(Api.TOP_CITY_RANK)
}  

export {getLineStatistic, getGraphStatistic, getLeidaGraph, getTopCityRank}