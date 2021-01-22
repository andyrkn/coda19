import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  useMediaQuery,
} from '@material-ui/core';

import emptyCardStyles from './EmptyCard.module.scss';

const EmptyCard = () => {
  const xs = useMediaQuery('(max-width:370px)');
  const md = useMediaQuery('(max-width:500px');

  const getResponsiveCardClass = () => {
    if (xs) {
      return emptyCardStyles.xs;
    }
    if (md) {
      return emptyCardStyles.md;
    }
    return emptyCardStyles.xl;
  };

  return (
    <div className={getResponsiveCardClass()}>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Word of the Day
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmptyCard;
