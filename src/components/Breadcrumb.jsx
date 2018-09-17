import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const breadcrumbNameMap = {
  '/orders': 'Orders',
  '/orders/': 'Detail'
};

const renderBreadCrumbItems = location => {
  const pathSnippets = location.pathname.split('/').filter(i => i);
  return pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
};

const BreadcrumbComponent = ({ location }) => (
  <Breadcrumb>{renderBreadCrumbItems(location)}</Breadcrumb>
);

export default withRouter(BreadcrumbComponent);
