import React, { PropTypes } from 'react';
import cx from 'classnames';
import { optionIcon, optionClass } from '../data/constants/constants';

const Option = ({ idServiceCategorySel, idServiceCategory, onServiceChange }) => {
  const onClick = () => onServiceChange(idServiceCategory);
  return (
    <div className="column small-4">
      <div
        role="button"
        onClick={onClick}
        className={cx(`circ-option box-shadow Cur(p) ${optionClass[idServiceCategory]}`, { selected: idServiceCategory === idServiceCategorySel })}
      >
        <img src={`/public/img/${optionIcon[idServiceCategory]}`} width="36px" height="36px" alt="" />
      </div>
    </div>
  );
};

Option.propTypes = {
  idServiceCategory: PropTypes.number.isRequired,
  idServiceCategorySel: PropTypes.number.isRequired,
  onServiceChange: PropTypes.func.isRequired,
};

export default Option;
