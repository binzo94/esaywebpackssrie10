

export const SEARCH_TYPES= [
  {key: 'Enterprise',name:'查企业',link:'/search/company'},
  {key: 'Qualifications',name:'查资质',link:'/search/qualification'},
  {key: 'Achievement',name:'查业绩',link:'/search/performance'},
  {key: 'Person', name:'查人员',link:'/search/person'},
    // {key: 'Bad', name:'查招标',link:'/search/search/tendering'},
  {key: 'Construction', name:'查在建',link:'/search/constructing'},
  {key: 'Honor',name:'查荣誉',link:'/search/honor'},
  {key: 'Bad', name:'查不良',link:'/search/bad'},

  {key: 'Combination', name:'组合搜索',link:'/search/combination'}
]

export const SEARCH_TYPE_KV = {
 'Enterprise':{name:'查企业', link:'/search/company',placeholderText:'请输入企业关键词搜索'},
 'Qualifications':{name:'查资质', link:'/search/qualification',placeholderText:'请输入资质关键词搜索'},
 'Achievement':{name:'查业绩', link:'/search/performance',placeholderText:'请输入业绩关键词搜索'},
 'Person':{name:'查人员', link:'/search/person',placeholderText:'请输入人员姓名关键词搜索'},
 //'Tender':{name:'查招标', link:'/search/tendering',placeholderText:'请输入项目名称关键词搜索'},
 'Construction':{name:'查在建', link:'/search/constructing',placeholderText:'请输入人员姓名关键词搜索'},
 'Honor':{name:'查荣誉', link:'/search/honor',placeholderText:'请输入荣誉名称关键词搜索'},
 'Bad':{name:'查不良', link:'/search/bad',placeholderText:'请输入不良名称关键词搜索'},
 'Combination':{name:'组合查询', link:'/search/combination'}
}

export const SEARCH_TYPE_KV_PAGE = {
    'enterprise':{name:'企业查询', link:'/search/enterprise'},
    'qualifications':{name:'资质查询', link:'/search/qualifications'},
    'achievement':{name:'业绩查询', link:'/search/achievement'},
    'person':{name:'人员查询', link:'/search/person'},
    //'tender':{name:'招标查询', link:'/search/tendering'},
    'construction':{name:'在建查询', link:'/search/constructing'},
    'honor':{name:'荣誉查询', link:'/search/honor'},
    'bad':{name:'不良查询', link:'/search/bad'},
    'combination':{name:'组合查询', link:'/search/combination'}
}




export const mobileReg =/^1[3456789]\d{9}$/
export const Authorities = {
  'NEED_AUTH_USER':{},
  'NEED_AUTH_VIP':{},
  'AUTH_VIP':{}
}
