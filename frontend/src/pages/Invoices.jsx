import { PageHeader } from "../components/pageHeader";
import { Box } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const Invoices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <PageHeader title="Invoices" button={true} link="/add-invoice"/>
      <Box
        sx={{
          marginTop: 3,
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: "4px",
        }}
      >
        <TableContainer sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Invoice Nr</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Date Of Issue</TableCell>
                <TableCell>Deadline Payments</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Sale Date</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  hover
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    cursor: "pointer",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell>{row.calories}</TableCell>
                  <TableCell>{row.fat}</TableCell>
                  <TableCell>{row.carbs}</TableCell>
                  <TableCell>{row.protein}</TableCell>
                  <TableCell>{row.protein}</TableCell>
                  <TableCell>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};
