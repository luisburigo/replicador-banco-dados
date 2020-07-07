import React from "react";
import {Layout, Menu} from 'antd';

import "./style.css";

const {Header, Content, Sider,} = Layout;

const MainLayout: React.FC = ({children}) => {
    return (
        <Layout className="main-layout">
            <Header>
                <div className="main-layout__logo">
                    Replicador de banco de dados
                </div>
            </Header>
            <Layout>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{height: '100%', borderRight: 0}}
                    >
                        <Menu.Item key="1">Processo 1</Menu.Item>
                        <Menu.Item key="2">Processo 2</Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content className="main-layout__content">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default MainLayout;
