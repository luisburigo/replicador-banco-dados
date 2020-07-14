import React, {useContext} from "react";
import {Layout, Menu} from 'antd';

import "./style.css";
import {DirecaoContext} from "../contexts/DirecaoContext";

const {Header, Content, Sider,} = Layout;

const MainLayout: React.FC = ({children}) => {
    const {processos} = useContext(DirecaoContext);

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
                        {
                            processos.map(processo => (
                                <Menu.Item key={processo.id}>{processo.descricao}</Menu.Item>
                            ))
                        }
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
