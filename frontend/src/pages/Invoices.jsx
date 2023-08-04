import { PageHeader } from "../components/pageHeader";
import { Box } from "@mui/material";
import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Invoices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [invoices, setInvoices] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetch("/api/invoices", {
        method: "GET",
        redirect: "follow",
      });
      const data = await res.json();
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  const dateReadable = (date) => {
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div>
      <PageHeader title="Invoices" button={true} link="/add-invoice" />
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
              {invoices.map((invoice) => {
                const totalGrossValue = invoice.items.reduce((total, curr) => {
                  const vatSum = (curr.vat / 100) * curr.price;
                  const grossValue = curr.price + vatSum;
                  return total + grossValue;
                }, 0);
                return (
                  <TableRow
                    hover
                    key={invoice._id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        to={`invoice/${invoice._id}`}
                        style={{
                          cursor: "pointer",
                          textDecorationLine: "underline",
                          color: "#1976d2",
                        }}
                      >
                        {invoice.invoiceNr}
                      </Link>
                    </TableCell>
                    <TableCell>{invoice.buyer.compnayName}</TableCell>
                    <TableCell>{dateReadable(invoice.dateOfIssue)}</TableCell>
                    <TableCell>
                      {dateReadable(invoice.deadlinePayments)}
                    </TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell>{dateReadable(invoice.saleDate)}</TableCell>
                    <TableCell>{totalGrossValue.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={invoices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};
