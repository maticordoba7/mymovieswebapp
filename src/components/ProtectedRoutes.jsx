import React from 'react';
import { Layout } from 'antd';
import HeaderComponent from './containers/HeaderComponent';
import ContentComponent from './containers/ContentComponent';
import FooterComponent from './containers/FooterComponent';


function ProtectedRoutes() {
  return (
    <>
      <HeaderComponent />
      <Layout theme="light" className="layout">
        <ContentComponent />
      </Layout>
      <FooterComponent />
    </>
  );
}

export default ProtectedRoutes;