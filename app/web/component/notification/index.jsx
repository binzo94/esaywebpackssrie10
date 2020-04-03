import { notification ,message } from 'antd'

export const showErrorMsg= ( msg,key )=>{

  notification.error({
    key:'unique',
    message: '发生错误',
    description: msg.substring(0,100)||'发生错误',
    placement: 'bottomRight'
  });
}

export const showMsg= ( msg )=>{

  notification.success({
    message: '成功',
    description: msg||'操作成功',
    placement: 'bottomRight'
  });
}

export const showMessage= ( msg )=>{
  const key = 'updatable';
  message.warning({content: msg,key});
}
