import React, { PropTypes } from 'react';
import cx from 'classnames';

const optionIcon = {
  laundry: 'washing-machine.svg',
  iron: 'plancha.svg',
  dry: 'gancho.svg',
};

const Option = ({ selected, option }) => (
  <div className="column small-4">
    <div className={cx(`circ-option box-shadow Cur(p) ${option}`, { selected })}>
      <img src={`/public/img/${optionIcon[option]}`} width="36px" height="36px" alt="" />
    </div>
  </div>
);

Option.propTypes = {
  selected: PropTypes.bool,
  option: PropTypes.string.isRequired,
};

export default Option;
