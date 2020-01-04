import React from 'react';
import PropTypes from 'prop-types';
import style from './style.sass';
import ColorRow from './components/ColorRow';

const EditCanvas = ({ colorValue, activeIndex, changeActive }) => (
  <div className={style.box}>
    <div className={style.boxCanvas}>
      {colorValue.map((v, k) => (
        <ColorRow
          key={k}
          colorValue={v}
          isActive={k === activeIndex}
          onRowClick={changeActive.bind(this, k)}
        />
      ))}
    </div>
  </div>
);

EditCanvas.propTypes = {
  colorValue: PropTypes.array.isRequired,
  changeActive: PropTypes.func,
  activeIndex: PropTypes.number,
};

export default EditCanvas;