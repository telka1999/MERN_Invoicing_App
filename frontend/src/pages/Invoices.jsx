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
import dateReadable from "../utils/dateReadable";
import CircularProgress from "@mui/material/CircularProgress";

export const Invoices = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [count, setCount] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChangePage = async (e, newPage) => {
    setLoading(true);
    setPage(newPage);
    if (e.target.dataset.testid === "KeyboardArrowLeftIcon") {
    }
    const res = await fetch(
      `/api/invoices?page=${
        e.target.dataset.testid === "KeyboardArrowLeftIcon"
          ? prev.page
          : next.page
      }&limit=${
        e.target.dataset.testid === "KeyboardArrowLeftIcon"
          ? prev.limit
          : next.limit
      }`,
      {
        method: "GET",
        redirect: "follow",
      }
    );
    const data = await res.json();
    setPrev(data.previous);
    setNext(data.next);
    setCount(data.count);
    setInvoices(data.invoices);
    setLoading(false);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      const res = await fetch(`/api/invoices?page=${1}&limit=${10}`, {
        method: "GET",
        redirect: "follow",
      });
      const data = await res.json();
      setPrev(data.previous);
      setNext(data.next);
      setCount(data.count);
      setInvoices(data.invoices);
      setLoading(false);
    };
    fetchInvoices();
  }, []);

  return loading ? (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 112px)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  ) : (
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
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};
