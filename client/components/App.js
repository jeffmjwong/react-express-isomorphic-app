import React from 'react';
import { connect } from 'react-redux';

const App = ({ test }) => (
  <div>
    <h2>This is an Isomorphic App with React and Express!</h2>
    <h3>This is from redux store!! {test}</h3>
  </div>
);

const mapStateToProps = (state) => ({
  test: state.test,
});

export default connect(mapStateToProps)(App);
