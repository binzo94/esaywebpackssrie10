import {Component} from "react";
import _Tools from "../smartList/tools";
import _ from "lodash";
import {Http} from "../http";
import {List, LocaleProvider, Pagination} from "antd";
import zh_CN from "antd/es/locale-provider/zh_CN";
import numeral from "numeral";
import React from "react";
import './index.css'
import { NoTokenPost,Post,Get } from '../../../utils/request';

export default class BaseTable extends Component {
    constructor(props) {
        super(props);
        let queryConditions = _Tools.decodeBase64(_.get(props, 'location.query.conditions'));
        this.state = {
            dataList: null,
            page: _.extend({
                number: _.get(props, 'location.query.number')||1,
                size: _.get(props, 'location.query.size')||10
            }, props.defaultPage),
            sort: props.defaultSort||(_.get(props, 'location.query.sort')?_Tools.decodeBase64(_.get(props, 'location.query.sort')):{}),
            conditions: _.isEmpty(queryConditions)?props.defaultConditions:queryConditions,
            loading: false
        }
    }

    componentDidMount() {
        this.query();
    }

    query = ()=> {
        const { queryURL, genConditionsFunc, shouldChangeQuery, queryParams, queryType, getSize} = this.props;


        this.setState({loading: true}, async()=> {
            const { page, sort, conditions } = this.state;
            var pageData=page

            if(queryType=='post'){
                const res = await Post(queryURL,
                    _.extend(queryParams||{}, {
                        page: page.number,
                        size: page.size,
                        pageSize:page.size
                    }))

                    if(_.isFunction(getSize)) getSize({
                        number:pageData.number,
                        size:_.get(res, 'data.content.size')||this.state.page.size,
                        totalElements:_.get(res, 'data.content.totalElements')||_.get(res, 'data.content.total')||0,
                        totalCount:_.get(res, 'data.content.totalCount')||_.get(res, 'data.content.total')||0,
                        totalPages:_.get(res, 'data.content.totalPage')
                    })
                    this.setState({
                        loading: false,
                        dataList: _.get(res, 'data.content.content'),
                        page: {
                            number:pageData.number,
                            size:_.get(res, 'data.content.size')||this.state.page.size,
                            totalElements:_.get(res, 'data.content.totalElements')||_.get(res, 'data.content.total')||0,
                            totalCount:_.get(res, 'data.content.totalCount')||0,
                            totalPages:_.get(res, 'data.content.totalPage')
                        }
                    });
                // Http.post(queryURL,
                //     _.extend(queryParams||{}, {
                //         page: page.number,
                //         size: page.size,
                //         pageSize:page.size
                //     })
                // ).then((res)=>{
                //     var page={
                //         number:pageData.number,
                //         size:_.get(res, 'data.content.size')||this.state.page.size,
                //         totalElements:_.get(res, 'data.content.totalCount')||_.get(res, 'data.content.total')||0,
                //         totalPages:_.get(res, 'data.content.totalPage')
                //     }
                //     if(_.isFunction(getSize)) getSize(page)
                //     this.setState({
                //         loading: false,
                //         dataList: _.get(res, 'data.content.content'),
                //         page: page,
                //     });
                // })
            }else{
                Http.get(queryURL,
                    _.extend(queryParams||{}, {
                        page: page.number,
                        size: page.size
                    })
                ).then((res)=>{
                    var page={
                        number:pageData.number,
                        size:_.get(res, 'data.content.size'),
                        totalCount:_.get(res, 'data.content.totalCount'),
                        totalElements:_.get(res, 'data.content.totalElements'),
                        totalPages:_.get(res, 'data.content.totalPage')
                    }
                    if(_.isFunction(getSize)) getSize(page)
                    this.setState({
                        loading: false,
                        dataList: _.get(res, 'data.content.content'),
                        page: page
                    });
                })
            }


        });
    };

    changeConditions = (conditions)=> {
        this.setState({
            conditions: conditions,
            page: _.extend(this.state.page, {number: 0}),
        }, ()=> {
            this.query();
        })
    };

    refresh = ()=>{
        this.setState({
            page: _.extend(this.state.page, {number: 1}),
        }, ()=> {
            this.query();
        })
    };

    changePage = (page, size)=> {
        this.setState({page: _.extend(this.state.page, {number: page, size: size})}, ()=> {
            this.query();
        })
        if(this.props.onPageChange){
            this.props.onPageChange(page,size)
        }
    };

    changeSort = (sort)=> {
        this.setState({
            sort: sort,
            page: _.extend(this.state.page, {number: 0}),
        }, ()=> {
            this.query();
        })
    };

    render = ()=> {
        const { ...other } = this.props;
        const { loading, dataList, page, sort } = this.state;
        return (
            <LocaleProvider locale={zh_CN}>
                <DataTable
                    dataList={dataList}
                    loading={loading}
                    page={page}
                    sort={sort}
                    pageSizeOptionsCustom={this.props.pageSizeOptionsCustom}
                    onChangePage={this.changePage}
                    onChangeSort={this.changeSort}
                    {...other}
                />
            </LocaleProvider>
        )
    }
}

class DataTable extends Component {
    constructor(props) {
        super(props);
    }

    onChangePage = (page, pageSize)=> {
        if(_.isFunction(this.props.onChangePage)) this.props.onChangePage(page, pageSize);
        window.scrollTo(0,400)
    };

    onChangeSize = (current, size)=> {
        if(_.isFunction(this.props.onChangePage)) this.props.onChangePage(1, size);
    };

    render() {
        let { dataList, page, columns, sortColumns, extraComponent, loading, ...other } = this.props;

        page = page ||{};
        columns = columns||[];
        sortColumns = sortColumns||[];
        columns.map((columnData)=> {
            if(_.indexOf(sortColumns, columnData.dataIndex)>=0) columnData.sorter = true;
        });
        return (
            <div className={'normalsearch-list'}>
                <div  className={'normalsearch-list-header'}>
                    {loading?<div className={'normalsearch-list-totalnumber'}>
                        查询中
                    </div>:<div className={'normalsearch-list-totalnumber'}>共有<span>{page.totalElements}</span>条数据</div>}
                    <div>
                        {extraComponent}
                    </div>
                </div>

                <List
                    dataSource={dataList||[]}
                    renderItem={this.props.renderItem}
                    {...other}
                />

                <div style={{textAlign: 'center', padding: '41px 0'}}>
                    <Pagination
                        showQuickJumper={true}
                        size="large"
                        current={page.number}
                        pageSize={page.size}
                        total={page.totalCount}
                        onChange={this.onChangePage}
                    />
                </div>
            </div>
        )
    }
};