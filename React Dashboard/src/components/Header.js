import React from 'react';
import { Fragment } from 'react';
import "./css/Header.css";
import UserInfo from './UserInfo.js';

function Header() {
  return (
    <Fragment>
      <section id="main-nav">
        <UserInfo />
      </section>
    </Fragment>
  );
}

export default Header;