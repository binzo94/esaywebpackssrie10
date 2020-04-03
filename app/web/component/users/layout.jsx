import React from 'react'
import { Layout, Menu, LocaleProvider} from 'antd';
import Sidemenu from '../users/sideMenu'
import {Headers} from '../header/header'
import {Footers} from '../footer/footer'
import UserInfo from '../baseWrb/userLayout/components/userInfo'
// import Information from '../users/information'

const { SubMenu } = Menu;
const { Header, Content, Sider,Footer } = Layout;


class LayoutUsers extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    handleClick = e => {
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
        if (!err) {
        }
        });
    };

    render() {
        // const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 4,
                    offset: 2,
                },
            },
        };
        return (
        <React.Fragment>
            
            <Layout>
                {/* <Header > */}
                    <Headers/>
                {/* </Header> */}
                <Layout style={{ padding: '0px 10%',width:'1500px' }}>
                    <Sider width={200} style={{ background: '#fff',height:'540px' }}>
                        <Sidemenu/>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Layout style={{ paddingBottom: '30px' }}>
                            <Content
                                style={{
                                    background: '#fff',
                                    // padding: 24,
                                    margin: 0,
                                    minHeight: 150,
                                    width:'970px'
                                }}
                            >                               
                                <UserInfo />      
                            </Content>
                        </Layout> 
                        <h3   style={{borderLeft:"5px solid #097FCA", margin:"0px 10px 20px 0px",paddingLeft:"10px"}}>{this.props.value}</h3>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                width:'970px'
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
                {/* <Footer> */}
                    <Footers/>
                {/* </Footer> */}
            </Layout>          
        </React.Fragment>
        );
    }
}

export default LayoutUsers