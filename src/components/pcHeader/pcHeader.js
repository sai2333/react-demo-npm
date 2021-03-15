import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
function Home(props) {
  return (
    <div id="header">
      <div className="container header-bg">
        <a href="/" className="logo">
          <img src={props.logo} alt={props.logoText} />
        </a>
        <div className="right-menu align-center">
          <ul className="menu-list flex ">
            {props.rightMenu.map((item) => {
              return (
                <li key={item.id} className={`menu-list-item ${item.active ? 'active' : ''}`}>
                  <a href={item.url}>{item.text}</a>
                  {
                    item.subMenu && <div className="sub-menu">
                    {
                      item.subMenu.map((ele) => {
                        return (
                          <a href={ele.url} className={`item ${ele.active ? 'active' : ''}`} key={ele.id}>{ele.text}</a>
                        )
                      })
                    }
                  </div>
                  }
                </li>
              );
            })}
          </ul>
          {
            props.showSearch &&
            <div className="search-wrap">
              <i className={props.searchIconClass} />
              {props.searchMenu && <div dangerouslySetInnerHTML = {{ __html:props.searchMenu }} />}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

class Header {
  constructor(options) {
    this.defaultOptions = {
      searchMenu: null,
      container: '.header_container'
    };
    console.log(options);
    this.options = Object.assign(this.defaultOptions, options);
    console.log(this.options);
  }
  init() {
    const domContainer = document.querySelector(`${this.options.container}`);

    ReactDOM.render(
      <Home
        text={this.options.text}
        rightMenu={this.options.rightMenu}
        logo={this.options.logo}
        showSearch={this.options.showSearch}
        logoText={this.options.logoText}
        searchMenu={this.options.searchMenu}
        searchIconClass={this.options.searchIconClass}
      />,
      domContainer
    );
  }
}

export default Header;