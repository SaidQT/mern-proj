import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography
} from '@mui/material';

const QuizzesTable = ({ quizzes }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6" gutterBottom component="div" sx={{ padding: 2 }}>
        All Quizzes 
      </Typography>
      <Table aria-label="quizzes table">
        <TableHead>
          <TableRow>
            <TableCell>Quiz Title</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Created By</TableCell>
            <TableCell align="right">Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz.id}>
              <TableCell component="th" scope="row">
                {quiz.title}
              </TableCell>
              <TableCell align="right">{quiz.category}</TableCell>
              <TableCell align="right">{quiz.createdBy?.name || 'Unknown'}</TableCell> {/* Assuming createdBy has a name field */}
              <TableCell align="right">{new Date(quiz.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuizzesTable;
