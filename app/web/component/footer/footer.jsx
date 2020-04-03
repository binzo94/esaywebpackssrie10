import React,{useEffect,useState}from 'react'
import './footer.css'
import {Icon} from 'antd'
import throttle from 'lodash.throttle';
export const Footers = (props) => {
    let [right,setRight] = useState(0)
    let [display,setDisplay] = useState('none')
    let  scrollHandler=()=>{
       //计算
        if(window.scrollY>50){
            setDisplay('block')
        }else{
            setDisplay('none')
        }
    }
    let handler = throttle(scrollHandler,300)
    useEffect(()=>{
        //计算宽度
        let totalWidth = window.innerWidth
        let poright = (totalWidth -1200)/2-100
        setRight(poright)
        window.addEventListener(
            "resize",resizeLogic
        );
        window.addEventListener('scroll',handler)
        return ()=>{
            window.removeEventListener("resize",resizeLogic);
            window.removeEventListener('scroll',handler)

        }
    })
    const resizeLogic = ()=>{
        let totalWidth = window.innerWidth
        let poright = (totalWidth -1200)/2-100
        setRight(poright)
    }

  return (<>
    <div className="footers">
      <p>版权所有：筑信云（北京）科技有限公司         CopyRight © 2020  CIC.All Rights Reserved 京ICP备19321  京公网安备 50019002005330号</p>

    </div>
          <div onClick={()=>{window.scroll(0,0)}} className={'scroll-top'} style={{right:right+'px',display:display}} title={'回到顶部'}>
              <Icon type="up"  className={'scroll-icon'}/>
          </div>
      </>
  )
}
