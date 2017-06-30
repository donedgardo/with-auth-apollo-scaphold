import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import { gql, graphql } from 'react-apollo';
import { Cookies } from 'react-cookie';

const HeaderContainer = ({ pathname, data }) => {
  return (
    <header>
      <Link prefetch href='/'>
        <a className={pathname === '/' && 'is-active'}>Home</a>
      </Link>
      <Link prefetch href="/login">
        <a className={pathname === '/login' && 'is-active'}>Login</a>
      </Link>
      <Link prefetch href="/me">
        <a className={pathname === '/login' && 'is-active'}>{ data.viewer.user ? data.viewer.user.username : null}</a>
      </Link>

    <style jsx>{`
      header {
        margin-bottom: 25px;
      }
      a {
        font-size: 14px;
        margin-right: 15px;
        text-decoration: none;
      }
      .is-active {
        text-decoration: underline;
      }
      `}</style>
    </header>
  );
};

HeaderContainer.propTypes = {
  pathname: PropTypes.string.isRequired,
};

const viewer = gql`
query viewer {
  viewer{
    user{
      username
    }
  }
}
`;
export default graphql(viewer)(HeaderContainer);
