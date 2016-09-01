import React, { PropTypes } from 'react';

const RadialProgress = ({ progress }) => (
  <div className="radial-progress" data-progress={progress}>
    <div className="circle">
      <div className="mask full">
        <div className="fill" />
      </div>
      <div className="mask half">
        <div className="fill" />
        <div className="fill fix" />
      </div>
      <div className="shadow" />
    </div>
    <div className="inset">
      <div className="percentage">
        <div className="numbers"><span>{progress}%</span></div>
      </div>
    </div>
  </div>
);

RadialProgress.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default RadialProgress;
