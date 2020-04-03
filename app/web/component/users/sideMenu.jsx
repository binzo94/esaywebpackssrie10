import React from 'react'
import { Menu, Icon, Divider } from 'antd';
import _ from 'lodash'
import querystring from 'querystring'
import user from '../../asset/user.png'
import shoucang from '../../asset/shoucang.png'
import renzheng from '../../asset/renzheng.png'
import zuhe from '../../asset/zuhe.png'
import zizhanghao from '../../asset/zizhanghao.png'

// import { Http } from '../../component/baseWrb/http';
const { SubMenu } = Menu;
class Sidemenu extends React.Component {

  rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5']

  constructor(props) {
    super(props)
    let subKeyToItem = {'sub1':['1','2'],'sub2':['3'],'sub3':['4'],'sub4':['5'],'sub5':['6']}
    //获取search参数
    let str = window.location.search.substring(1)
    let defaultOpenKeys=['sub1']
    let defaultSelectedKeys=['2']
    let openKeys=['sub1']
    let selectedKeys=['2']
    if(str!=''){
      let obj  = querystring.decode(str)
      if(obj.sub!=undefined&&obj.item!=undefined){
         defaultOpenKeys=[obj.sub]
        defaultSelectedKeys=[obj.item]
        openKeys=[obj.sub]
        selectedKeys=[obj.item]
        this.props.changeIndex(obj.item)
      }
    }

    this.state = {
      openKeys,
      selectedKeys,
      data: [],
      defaultOpenKeys,
      defaultSelectedKeys
    };
  }

  componentDidMount() {
    this.setState({
      data: _.get(this.props, "data")
    })

  }

  componentWillReceiveProps(nextProps, curProps) {
    this.setState({
      data: _.get(nextProps, "data")
    })
  }
  onSelect = (info) => {
    const { selectedKeys } = this.state
    this.setState({
      selectedKeys: info.selectedKeys,
    });
  };

  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  handleClick = e => {
  };

  changeIndex = (val) => {
    this.props.changeIndex(val)
  }

  render() {
    return (
      <React.Fragment>
        {_.get(this.state, "data") == [] ? <div></div> :
          <div style={{ width: 200, paddingTop: '35px', paddingBottom: '40px', background: "white" }}>
            <Menu
              onClick={this.handleClick}
              style={{ width: 200 }}
              defaultOpenKeys={this.state.defaultOpenKeys}
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
              selectedKeys={this.state.selectedKeys}
              onSelect={this.onSelect}
              mode="inline"
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <img src={user} style={{ marginRight: '12px' }} />
                    <span>个人信息</span>
                  </span>
                }
              >
                <Menu.Item key="1" onClick={() => {
                  this.changeIndex(1)
                }}>
                  {/* <a href="/users/change"> */}
                  修改密码
                  {/* </a> */}
                </Menu.Item>
                <Menu.Item key="2" onClick={() => {
                  this.changeIndex(2)
                }}>
                  {/* <a href="/users/information"> */}
                  信息修改
                {/* </a> */}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <img src={renzheng} style={{ marginRight: '12px' }} />
                    <span>企业认证</span>
                  </span>
                }
              >
                <Menu.Item key="3" onClick={() => {
                  this.changeIndex(3)
                }}>
                  {/* <a href={`/users/enterpriseCertification?companyId=${_.get(this.state, "data.companyId") || "none"}&&status=${_.get(this.state, "data.status") || "none"}`}> */}
                    企业认证
                  {/* </a> */}
                </Menu.Item>
                {/* <Menu.Item key="4"><a href={"/users/enterprisesCertified?companyId="+_.get(this.state,"data.companyId")}>企业认证-已认证</a></Menu.Item> */}
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <img src={zuhe} style={{ marginRight: '12px' }} />
                    <span>组合定制</span>
                  </span>
                }
              >
                <Menu.Item key="5" onClick={() => {
                  this.changeIndex(5)
                }}>
                  {/* <a href="/users/customized"> */}
                    组合定制
                    {/* </a> */}
                    </Menu.Item>
              </SubMenu>
              {_.get(this.state, "data.child") == "1" ? null :
                <SubMenu
                  key="sub4"
                  title={
                    <span>
                      <img src={zizhanghao} style={{ marginRight: '12px' }} />
                      <span>子账号管理</span>
                    </span>
                  }
                >
                  <Menu.Item key="6" onClick={() => {
                  this.changeIndex(6)
                }}>
                  {/* <a href={"/users/subAccount?companyId=" + _.get(this.state, "data.companyId")}> */}
                    企业认证-子账户
                    {/* </a> */}
                    </Menu.Item>
                </SubMenu>
              }
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <img src={shoucang} style={{ marginRight: '12px' }} />
                    <span>收藏中心</span>
                  </span>
                }
              >
                <Menu.Item key="7" onClick={() => {
                  this.changeIndex(7)
                }}>
                  {/* <a href="/users/collection" > */}
                    收藏中心
                    {/* </a> */}
                    </Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        }

      </React.Fragment>
    );
  }
}

export default Sidemenu