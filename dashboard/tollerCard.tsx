import { Card, CardContent, Typography } from '@mui/material';
import React = require('react');

export default function TollerCard(dog) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {dog.name}
        </Typography>
      </CardContent>
    </Card>
  );
}
