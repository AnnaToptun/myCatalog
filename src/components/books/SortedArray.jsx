import { Box } from '@material-ui/core';
import React from 'react';
import { CardBook } from './CardBook';

export function SortedArray({ books }) {
  return (
    <Box>
      {
      books.map(card => (
        <Box key={card.id} my={4}>
          <CardBook card={card} />
        </Box>
      ))
      }
    </Box>
  );
}
