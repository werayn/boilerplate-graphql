import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import './MainLayout.less';

const { Footer, Sider } = Layout;

const rootRoutes = ['/', '/about'];

class MainLayout extends React.Component {

  static propTypes = {
      children: PropTypes.element.isRequired,
  }

  constructor(props) {
      super(props);
      this.state = {
          collapsed: false,
      };
  }

  handleOnCollapse = (collapsed) => {
      this.setState({ collapsed });
  };

  render() {
      const { collapsed } = this.state;
      const { children } = this.props;

      return (
          <Layout>
              <Sider collapsible collapsed={ collapsed } onCollapse={ this.handleOnCollapse }>
                  {
                      collapsed ?
                          <div className="logo">
                              {'V'}
                          </div>
                          :
                          <div className="logo">
                              {'Junique Virgile'}
                          </div>
                  }
                  <Menu
                      theme="dark"
                      mode="inline"
                      defaultSelectedKeys={ [
                          rootRoutes.indexOf(window.location.pathname).toString(),
                      ] }
                  >
                      <Menu.Item key="0">
                          <Link to="/">
                              <HomeOutlined />
                              <span className="menu-item-link">
                                  {'Home'}
                              </span>
                          </Link>
                      </Menu.Item>
                      <Menu.Item key="1">
                          <Link to="/about">
                              <QuestionCircleOutlined />
                              <span className="menu-item-link">
                                  {'About'}
                              </span>
                          </Link>
                      </Menu.Item>
                  </Menu>
              </Sider>
              <Layout>
                  {children}
                  <Footer>
                      <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/werayn"
                      >
                          {'GitHub'}
                      </a>
                  </Footer>
              </Layout>
          </Layout>
      );
  }
}

export { MainLayout };
