import React from 'react'
import { Component } from 'react'
import numeral from 'numeral'
import _ from 'lodash'

import {List, Pagination, LocaleProvider, Button} from 'antd'
import moment from 'moment';
import 'moment/locale/zh-cn';
import zh_CN from 'antd/es/locale-provider/zh_CN';
moment.locale('zh-cn');
import _Tools from './tools'
import {Http} from '../http'
import {isSafeObj} from '../../../utils/objectHelper';
import {isVip, isVipShow} from '../../../utils/userHelper';
import { NoTokenPost,Post,Get } from '../../../utils/request';


export default class BaseTable extends Component {
    constructor(props) {
        super(props);
        let queryConditions = _Tools.decodeBase64(_.get(props, 'location.query.conditions'));
        this.state = {
            dataList: null,
            page: _.extend({
                number: _.get(props, 'location.query.number') || 1,
                size: _.get(props, 'location.query.size') || 10,
            }, props.defaultPage),
            sort: props.defaultSort || (_.get(props, 'location.query.sort') ? _Tools.decodeBase64(_.get(props, 'location.query.sort')) : {}),
            conditions: _.isEmpty(queryConditions) ? props.defaultConditions : queryConditions,
            loading: false
        }
    }

    componentDidMount() {
        const{ queryURL } = this.props;
        console.log(366666,queryURL)
        if( queryURL === '/combination/search'){
            if(!isVip()){
                isVipShow()
            }
        }
        this.query();
    }

    query = (isPageInit=false) => {
        const { queryURL, genConditionsFunc, shouldChangeQuery, queryParams, queryType, setpage = () => { } } = this.props;


        this.setState({ loading: true }, async() => {
            const { page, sort, conditions } = this.state;
            var pageData = page
            if (queryType == 'post') {
                console.log('重置页码',isPageInit)
                const res = await Post(queryURL,
                    _.extend(queryParams || {}, {
                        page: isPageInit?1:page.number,
                        size: page.size,
                        pageSize: page.size
                    })
                )
                setpage({
                    number: isPageInit?1:page.number,
                    size: _.get(res, 'data.content.size') || this.state.page.size,
                    totalCount:_.get(res, 'data.content.totalCount')||0,
                    totalElements: _.get(res, 'data.content.totalElements') || _.get(res, 'data.content.total') || _.get(res, 'data.content.totalSize'),
                    totalPages: _.get(res, 'data.content.totalPage')
                });
                this.setState({
                    loading: false,
                    dataList: _.get(res, 'data.content.content'),
                    page: {
                        number: isPageInit?1:page.number,
                        size: _.get(res, 'data.content.size') || this.state.page.size,
                        totalCount:_.get(res, 'data.content.totalCount')||0,
                        totalElements: _.get(res, 'data.content.totalElements') || _.get(res, 'data.content.total') || _.get(res, 'data.content.totalSize'),
                        totalPages: _.get(res, 'data.content.totalPage')
                    }
                });
                // Http.post(queryURL,
                //     _.extend(queryParams || {}, {
                //         page: page.number,
                //         size: page.size,
                //         pageSize: page.size
                //     })
                // ).then((res) => {
                //     var page = {
                //         number: pageData.number,
                //         size: _.get(res, 'data.content.size') || this.state.page.size,
                //         totalElements: _.get(res, 'data.content.totalCount') || _.get(res, 'data.content.total') || _.get(res, 'data.content.totalSize'),
                //         totalPages: _.get(res, 'data.content.totalPage')
                //     }
                //     setpage(page);
                //     this.setState({
                //         loading: false,
                //         dataList: _.get(res, 'data.content.content'),
                //         page: page
                //     });
                // })
            } else {
                Http.get(queryURL,
                    _.extend(queryParams || {}, {
                        page: isPageInit?1:page.number,
                        size: page.size
                    })
                ).then((res) => {
                    var page = {
                        number: isPageInit?1:page.number,
                        size: _.get(res, 'data.content.size'),
                        totalCount:_.get(res, 'data.content.totalCount')||0,
                        totalElements: _.get(res, 'data.content.totalElements'),
                        totalPages: _.get(res, 'data.content.totalPage')
                    }
                    setpage({
                        number: isPageInit?1:page.number,
                        size: _.get(res, 'data.content.size') || this.state.page.size,
                        totalCount:_.get(res, 'data.content.totalCount')||0,
                        totalElements: _.get(res, 'data.content.totalElements') || _.get(res, 'data.content.total') || _.get(res, 'data.content.totalSize'),
                        totalPages: _.get(res, 'data.content.totalPage')
                    });
                    this.setState({
                        loading: false,
                        dataList: _.get(res, 'data.content.content'),
                        page: {
                            ...page,
                            number: isPageInit?1:page.number
                        }
                    });
                })
            }


        });
    };

    changeConditions = (conditions) => {
        this.setState({
            conditions: conditions,
            page: _.extend(this.state.page, { number: 0 }),
        }, () => {
            this.query();
        })
    };

    changePage = (page, size) => {
        this.setState({ page: _.extend(this.state.page, { number: page, size: size }) }, () => {
            this.query();
        })
    };

    changeSort = (sort) => {
        this.setState({
            sort: sort,
            page: _.extend(this.state.page, { number: 0 }),
        }, () => {
            this.query();
        })
    };



    render = ()=> {
        const { exportFun=()=>{}, headerComp, ...other } = this.props;
        const { loading, dataList, page, sort } = this.state;
        const { totalElements = 0} = page
        const header = headerComp?<div className={'header_wrapper'}>
            <div>
                共有<span style={{color:'hsla(4, 75%, 60%, 1)'}}>{ totalElements }</span>条结果
            </div>
            <Button style={{background:'#2B64F1',borderRadius:'5px',color:'#FFFFFF',border:'1px solid #2B64F1'}} onClick={exportFun}>数据导出</Button>
        </div>:''
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
                    header={header}
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

    onChangePage = (page, pageSize) => {
        if (_.isFunction(this.props.onChangePage)) 
            this.props.onChangePage(page, pageSize);
        window.scrollTo(0,400)
        
    };

    onChangeSize = (current, size) => {
        if (_.isFunction(this.props.onChangePage)) this.props.onChangePage(1, size);
    };

    render() {
        let { dataList, page, columns, sortColumns, textAlign, showSizeChanger = true, ...other } = this.props;

        page = page || {};
        columns = columns || [];
        sortColumns = sortColumns || [];
        columns.map((columnData) => {
            if (_.indexOf(sortColumns, columnData.dataIndex) >= 0) columnData.sorter = true;
        });
        return (
            <div {...this.props}>
                <List
                    dataSource={dataList || []}
                    renderItem={this.props.renderItem}
                    {...other}
                />

                <div style={{ height: 20 }}></div>

                <div style={{ textAlign: textAlign || 'right', marginRight: "20px" }}>
                    <Pagination
                        showQuickJumper={true}
                        showSizeChanger={showSizeChanger}
                        showTotal={(total) => { return "共 " + numeral(total).format('0,0') + " 行数据" }}
                        size="large"
                        current={page.number}
                        pageSize={page.size}
                        total={page.totalCount}
                        onChange={this.onChangePage}
                        onShowSizeChange={this.onChangeSize}
                        pageSizeOptions={this.props.pageSizeOptionsCustom ? this.props.pageSizeOptionsCustom : ['10', '20', '30', '50', '100']}
                    />
                </div>
            </div>
        )
    }
};
