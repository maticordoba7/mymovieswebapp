import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './containers/HeaderComponent';
import ContentComponent from './containers/ContentComponent';
import FooterComponent from './containers/FooterComponent';


function ProtectedRoutes() {
  return (
    <Layout theme="light" className="layout">
      <HeaderComponent />
      <ContentComponent />
      <FooterComponent />
    </Layout>
  );
}

export default ProtectedRoutes;