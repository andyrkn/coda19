import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import emptyCardStyles from './EmptyCard.module.scss';

const EmptyCard = () => (
  <div className={emptyCardStyles.card}>
    ]
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
      </CardContent>
    </Card>
  </div>
);

export default EmptyCard;
