import React from 'react';
import { Header } from 'containers';
import { Footer } from 'components';
import LoadingBar from 'react-redux-loading-bar';

const Page = props =>
  <div className="overman-page">
    <LoadingBar />
    <Header options={props.headerOptions}/>
    {props.children}
    <Footer doNotShow={props.showFooter === false}/>
  </div>;

export default Page;