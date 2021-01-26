import React from "react";
import "antd/dist/antd.css";
import "./Nav.css";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  GlobalOutlined,
  UserOutlined,
  HeartFilled,
  LayoutFilled,
} from "@ant-design/icons";
import Home from "../Pages/Home";
import Map from "../Pages/Map";
import Massages from "../Pages/Massages";
import Profile from "../Pages/Profile";
import Upload from "../Pages/Upload";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
          breakpoint="md"
          trigger={true}
        >
          <div className="logo">
            <img src="../../Assets/ReBuy.jpeg" alt="logo" />
          </div>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<HomeFilled />}>
              Home
            </Menu.Item>
            <Menu.Item key="2" icon={<GlobalOutlined />}>
              Map
            </Menu.Item>
            <SubMenu key="3" icon={<LayoutFilled />} title="Catagories">
              <Menu.Item key="4">Hot</Menu.Item>
              <Menu.Item key="5">New</Menu.Item>
              <Menu.Item key="6">Popular</Menu.Item>
            </SubMenu>
            <Menu.Item key="7" icon={<HeartFilled />}>
              Favorite
            </Menu.Item>
            <Menu.Item key="8" icon={<UserOutlined />}>
              Profile
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu> */}
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Home />
            <Map />
            <Massages />
            <Upload />
            <Profile />
          </Content>
          <Footer style={{ textAlign: "center" }}>
            ©ReBuy {new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
