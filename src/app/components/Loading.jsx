import React, { PropTypes } from 'react';

const Loading = ({ loading }) => (
  <div>
    {loading ? (
      <div>Loading</div>
    ) : null}
  </div>
);

Loading.propTypes = {
  loading: PropTypes.bool,
};

export default Loading;
