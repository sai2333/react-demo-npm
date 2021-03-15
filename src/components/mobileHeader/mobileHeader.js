import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
function Home(props) {
  const [result, setResult] = useState(props.result);
  const [maskStyle, setMaskStyle] = useState({
    transition: 'all .6s',
    transform: 'translateX(136%)',
  });
  const [sidebarMenuStyle, setSidebarMenuStyle] = useState({
    zIndex: '-10',
    opacity: '0',
  });
  const [duration] = useState(props.duration ? Number(props.duration) : 600);
  const [switchFlag, setSwitchFlag] = useState(0);

  const showMenu = (mask, sidebar) => {
    setMaskStyle({ ...mask, transform: 'translateX(36%)' });
    setSidebarMenuStyle({ ...sidebar, zIndex: '98', opacity: '1' });
  };
  const hideMenu = (mask, sidebar) => {
    setMaskStyle({ ...mask, transform: 'translateX(136%)' });
    setTimeout(() => {
      setSidebarMenuStyle({ ...sidebar, zIndex: '-10', opacity: '0' });
    }, duration);
  };
  // 开关侧边栏
  const toggleMenu = () => {
    if (switchFlag) {
      hideMenu(maskStyle, sidebarMenuStyle);
    } else {
      showMenu(maskStyle, sidebarMenuStyle);
    }
    setSwitchFlag(switchFlag ? 0 : 1);
  };
  // 开关菜单子项
  const toggleMenuItem = (e, i, nodeLength) => {
    e.stopPropagation();
    if (nodeLength) {
      e.preventDefault();
    }
    let newResult = result.map((item, key) => {
      if (i === key) {
        item.active = !item.active;
      }else{
        item.active = false;
      }
      return item;
    });
    setResult(newResult);
  };
  useEffect(() => {
    // 设置切换的时间
    setMaskStyle({ ...maskStyle, transition: 'all ' + duration / 1000 + 's' });
  }, []);
  return (
    <>
      <header className="header">
        <div className="container flex justify-between align-center">
          <a href="/" className="logo-box">
            <img src={props.logo} alt="logo" />
          </a>
          <div className="r">
            <div className="to-search-page">
              <i className="iconfont icon-search" />
            </div>
            <div className="switch-button" onClick={toggleMenu}>
              <i className="icon-open open" />
            </div>
          </div>
        </div>
      </header>
      <div
        className="sidebar-menu"
        style={sidebarMenuStyle}
        onClick={() => {
          toggleMenu();
        }}
      >
        <div className="mask" style={maskStyle}>
          <ul className="nav-list-box">
            {result.map((item, index) => {
              return (
                <li
                  key={index}
                  id={'menu-item-' + index}
                  className={
                    'menu-item menu-item-type-custom menu-item-object-custom ' +
                    (item.subMenu && item.subMenu.length > 0 ? 'menu-item-has-children' : '') + 
                    (item.active ? ' active' : '')
                  }
                >
                  <a
                    href={item.url}
                    onClick={(e) => {
                      toggleMenuItem(e, index, item.subMenu && item.subMenu.length);
                    }}
                  >
                    <div className="l">
                      <img src={`/Public/img/mobile/sidebar/${item.name}.png`} alt="" className="menu-child-icon"/>
                      <span>{item.text}</span>
                    </div>
                    {
                      item.subMenu ? item.active ? <i className="iconfont icon-minus-bold" /> : <i className="iconfont icon-add-bold" /> : null
                    }
                  </a>
                  {item.subMenu && item.subMenu.length ? (
                    <ul
                      className="sub-menu"
                      style={{ display: item.active ? 'block' : 'none' }}
                    >
                      {item.subMenu.map((sub, key) => {
                        return (
                          <li
                            className={
                              'menu-item menu-item-type-post_type menu-item-object-about ' +
                              (sub.active ? 'active' : '')
                            }
                            key={key}
                          >
                            <a href={sub.url}>{sub.text}</a>
                          </li>
                        );
                      })}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

class SidebarMenu {
  constructor(options) {
    this.defaultOptions = {
      searchMenu: null,
    };
    this.options = Object.assign(this.defaultOptions, options);
    this.init();
  }
  init() {
    const domContainer = document.querySelector('.sidebarMenu_container');

    ReactDOM.render(<Home {...this.options} />, domContainer);
  }
}

export default SidebarMenu;
