import React from 'react';
import { Box } from '@material-ui/core';
import { CardBook } from './CardBook';
import classesPages from '../styles/classesPages';

export function SortedArray({ books, deleteBookUser, includeBook }) {
  return (
    <Box style={classesPages.pageAllCard}>
      {
      books.map(card => (
        <Box key={card.id} my={4}>
          <CardBook includeBook={includeBook} deleteBookUser={deleteBookUser} card={card} />
        </Box>
      ))
      }
    </Box>
  );
}
