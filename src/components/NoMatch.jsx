import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => (
  <div>
    Couln&apos;t find the page you were looking for...{' '}
    <span role="img" aria-label="Bandaged emoji">
      🤕
    </span>
    <Link to="/">
      <button type="button">Take me back to safety</button>
    </Link>
  </div>
);

export default NoMatch;
