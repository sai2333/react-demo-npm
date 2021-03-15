import React, { useEffect,useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
function Home(props) {
    const [showButton,setShowButton] = useState(false);
    const toTopHandle = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }
    const checkShowTopButton = () => {
        const bodyClientHeight = document.body.clientHeight;
        const windowScrollY = window.scrollY;
        if(windowScrollY > bodyClientHeight / 5) {
            setShowButton(true);
        }else{
            setShowButton(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll',checkShowTopButton);
    },[])
    return (
        showButton ? (<div className="to-top-wrap" onClick={toTopHandle}>
            <i className={`iconfont icon ${props.iconClass}`} />
            <span className="text">{props.text}</span>
        </div>) : null
    )
}
class ToTop {
    constructor(options) {
      this.defaultOptions = {
        text: 'Top',
        iconClass: 'icon-arrow-up-bold',
        container: '.to_top_container'
      };
      this.options = Object.assign(this.defaultOptions, options);
    }
    init() {
      const domContainer = document.querySelector(`${this.options.container}`);
      if(!domContainer) {
        throw new Error('请输入正确的container')
      }
      ReactDOM.render(
        <Home
          {...this.options}
        />,
        domContainer
      );
    }
  }
  
  export default ToTop;