import React from 'react';
import { Card, CardContent } from '@material-ui/core';

import emptyCardStyles from './EmptyCard.module.scss';

// eslint-disable-next-line react/prop-types
const EmptyCard = ({ content }) => (
  <div className={emptyCardStyles.container}>
    <Card>
      <CardContent>
        {/* <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography> */}
        {content}
      </CardContent>
    </Card>
  </div>
);

export default EmptyCard;
