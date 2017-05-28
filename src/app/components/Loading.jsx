import React, { PropTypes } from 'react';

const Loading = ({ loading }) => (
  <div>
    {loading ? (
      <div>Loading</div>
    ) : null}
  </div>
);

Loading.defaultProps = {
  loading: false,
};

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
