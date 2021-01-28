import React from 'react';

import PropTypes from 'prop-types';

import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import styles from './LineChart.module.scss';

export const handleToggle = (key, lines, setLines) => () => {
  const newData = lines.map((line) =>
    line.key === key ? { ...line, checked: !line.checked } : line
  );
  setLines(newData);
};

export const renderLegend = (content, lines, setLines) => () => (
  <div className={styles.checkboxContainer}>
    {content.map((entry) => (
      <span key={entry.key} className={styles.checkbox}>
        {/* <Checkbox
          defaultChecked={true}
          className={styles.legendCheckBox}
          style={{ color: entry.color }}
          onChange={handleToggle(entry.key, lines, setLines)}
        >
          {entry.value}
        </Checkbox> */}
        <FormGroup row>
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                checked
                onChange={handleToggle(entry.key, lines, setLines)}
                name="checkedA"
              />
            }
            label="Secondary"
          />
          <FormControlLabel
            control={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <Checkbox
                checked
                onChange={handleToggle(entry.key, lines, setLines)}
                name="checkedB"
                color="primary"
              />
            }
            label="Primary"
          />
          <FormControlLabel
            control={<Checkbox name="checkedC" />}
            label="Uncontrolled"
          />
        </FormGroup>
      </span>
    ))}
  </div>
);

export const getDomainMargins = (data) => {
  let maxDomain = -Infinity;
  let minDomain = Infinity;

  data.forEach((element) => {
    // Object.values(element).forEach((val) => {
    //   if (!Number.isNaN(Number(val))) {
    //     if (maxDomain < val) {
    //       maxDomain = val;
    //     }
    //     if (minDomain > val) {
    //       minDomain = val;
    //     }
    //   }
    // });
    if (maxDomain < element.uv) {
      maxDomain = element.uv;
    } else if (maxDomain < element.pv) {
      maxDomain = element.pv;
    }
    if (minDomain > element.uv) {
      minDomain = element.uv;
    } else if (minDomain > element.pv) {
      minDomain = element.pv;
    }
  });

  return {
    maxDomain,
    minDomain,
  };
};

renderLegend.propTypes = {
  key: PropTypes.string,
  lines: PropTypes.node,
  setLines: PropTypes.func,
};

handleToggle.propTypes = {
  key: PropTypes.string,
  lines: PropTypes.node,
  setLines: PropTypes.func,
};
