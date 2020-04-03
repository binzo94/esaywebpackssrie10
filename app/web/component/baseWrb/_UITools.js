import React from 'react';
import { notification, } from 'antd';
import moment from 'moment'

export default {
    showMessage(message, duration) {
        notification.info({
            message: '消息',
            description: message,
            placement: 'bottomRight'
        });
    },
    
    showErrorMessage(errMsg) {
        errMsg = errMsg||"";
        notification.error({
            message: '发生错误',
            description: errMsg.substring(0, 100),
            placement: 'bottomRight'
        });
    },
    
    showSuccessMessage(message, duration) {
        notification.success({
            message: '成功',
            description: message,
            placement: 'bottomRight'
        });
    },

    TableColumn: {
        index: { title: '#', dataIndex: 'index', width: 30, className: 'center',
            render: (t, r, i) => {
                return (
                    <span>{i+1}</span>
                )
            }
        },
        createdAt: { title: '新增时间', dataIndex: 'createdAt', width: 80, className: 'center',
            render: (t, r, i) => {
                return (
                    <span>{moment(r.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            }
        },
        updatedAt: { title: '最后更新时间', dataIndex: 'updatedAt', width: 150, className: 'center',
            render: (t, r, i) => {
                return (
                    <span>{moment(r.updatedAt).format('YYYY-MM-DD HH:mm:ss')}</span>
                )
            }
        }

    }
};
