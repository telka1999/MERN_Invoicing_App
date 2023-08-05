import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import { useToast } from "../context/toastContext";
import { useNavigate } from "react-router-dom";
import dateReadable from "../utils/dateReadable";

export const SingleInvoice = () => {
  const { id } = useParams();
  const { setOpen, setMessage } = useToast();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState({
    netValue: 0,
    vatSum: 0,
    grossValue: 0,
  });
  const [open, setOpenDelete] = useState(false);

  const handleClickOpen = () => {
    setOpenDelete(true);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  useEffect(() => {
    const fetchSingleInvoice = async () => {
      const res = await fetch(`/api/invoices/${id}`, {
        method: "GET",
        redirect: "follow",
      });
      const data = await res.json();
      const totalNetValue = data.items.reduce((total, curr) => {
        const netValue = curr.quantity * curr.price;
        return total + netValue;
      }, 0);
      const totalVatSum = data.items.reduce((total, curr) => {
        const vatSum = (curr.vat / 100) * curr.quantity * curr.price;
        return total + vatSum;
      }, 0);
      const totalGrossValue = data.items.reduce((total, curr) => {
        const grossValue =
          (curr.vat / 100) * curr.quantity * curr.price +
          curr.quantity * curr.price;
        return total + grossValue;
      }, 0);
      setInvoice(data);
      setTotal({
        netValue: totalNetValue,
        vatSum: totalVatSum,
        grossValue: totalGrossValue,
      });
      setLoading(false);
    };
    fetchSingleInvoice();
  }, []);

  const deletInvoice = async () => {
    try {
      var raw = JSON.stringify({
        invoiceId: invoice._id,
      });

      const res = await fetch("/api/invoices", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: raw,
        redirect: "follow",
      });
      const data = await res.json();
      if (data?.message) {
        setOpen(true);
        setMessage(data.message);
      } else {
        setOpen(true);
        setMessage("Successfully deleted invoice");
        navigate("/invoice");
      }
    } catch (error) {
      setOpen(true);
      setMessage(error.message);
    }
  };

  return loading ? (
    <div></div>
  ) : (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle>Delete Invoice</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Remember that this action is irrevocable, after deleting this
            invoice it cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={deletInvoice}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <div>
            <Typography variant="h5">{invoice.invoiceNr}</Typography>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <Button
              onClick={handleClickOpen}
              variant="outlined"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Button
              onClick={() => navigate(`/edit-invoice/${invoice._id}`)}
              variant="contained"
              startIcon={<EditNoteOutlinedIcon />}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadOutlinedIcon />}
            >
              Download
            </Button>
          </div>
        </Box>
        <Box sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}>
          <Box sx={{ padding: 4 }}>
            <Typography sx={{ marginBottom: 4 }} variant="h4" component="div">
              Invoice
            </Typography>
            <Box sx={{ display: "flex", gap: 6, marginBottom: 4 }}>
              <Box sx={{ display: "flex", gap: 3 }}>
                <Stack>
                  <Typography
                    sx={{ fontWeight: "500", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    Invoice Nr
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "500", marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    Place Of Issue
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "500", marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    Date Of Issue
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "500", marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    Sale Date
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    sx={{ fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.invoiceNr}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.placeOfIssue}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {dateReadable(invoice.dateOfIssue)}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {dateReadable(invoice.saleDate)}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 6, marginBottom: 4 }}>
              <Box sx={{ width: "50%" }}>
                <Stack>
                  <Typography
                    sx={{ fontWeight: "500" }}
                    variant="h7"
                    component="div"
                  >
                    Seller
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.seller.compnayName}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    NIP: {invoice.seller.nip}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.seller.street}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {`${invoice.seller.code} ${invoice.seller.city}`}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Stack>
                  <Typography
                    sx={{ fontWeight: "500" }}
                    variant="h7"
                    component="div"
                  >
                    Buyer
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.buyer.compnayName}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    NIP: {invoice.buyer.nip}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.buyer.street}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {`${invoice.buyer.code} ${invoice.buyer.city}`}
                  </Typography>
                </Stack>
              </Box>
            </Box>
            <Box sx={{ marginBottom: 4 }}>
              <Typography
                sx={{ fontWeight: "500" }}
                variant="h7"
                component="div"
              >
                Items
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Item Name</TableCell>
                        <TableCell>Qty.</TableCell>
                        <TableCell>Net Price</TableCell>
                        <TableCell>Net Value</TableCell>
                        <TableCell>VAT</TableCell>
                        <TableCell>Vat Sum</TableCell>
                        <TableCell>Gross Value</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invoice.items.map((item) => {
                        return (
                          <TableRow key={item._id}>
                            <TableCell sx={{ width: "35%" }}>
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="h7"
                                component="div"
                              >
                                {item.itemName}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="h7"
                                component="div"
                              >
                                {item.quantity}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="h7"
                                component="div"
                              >
                                {Number(item.price).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="h7"
                                component="div"
                              >
                                {Number(item.quantity * item.price).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="h7"
                                component="div"
                              >
                                {item.vat}%
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="h7"
                                component="div"
                              >
                                {Number(
                                  (item.vat / 100) * item.quantity * item.price
                                ).toFixed(2)}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                sx={{ fontSize: 14 }}
                                variant="h7"
                                component="div"
                              >
                                {Number(
                                  (item.vat / 100) *
                                    item.quantity *
                                    item.price +
                                    item.quantity * item.price
                                ).toFixed(2)}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      <TableRow>
                        <TableCell sx={{ width: "35%" }}></TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontWeight: "500" }}
                            variant="h7"
                            component="div"
                          >
                            Total:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14 }}
                            variant="h7"
                            component="div"
                          >
                            {Number(total.netValue).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14 }}
                            variant="h7"
                            component="div"
                          >
                            {Number(total.vatSum).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            sx={{ fontSize: 14 }}
                            variant="h7"
                            component="div"
                          >
                            {Number(total.grossValue).toFixed(2)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ display: "flex", gap: 3, width: "50%" }}>
                <Stack>
                  <Typography
                    sx={{ fontWeight: "500", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    Deadline Payments
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "500", marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    Payment Method
                  </Typography>
                  <Typography
                    sx={{ fontWeight: "500", marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    Account Number
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    sx={{ fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {dateReadable(invoice.deadlinePayments)}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.paymentMethod}
                  </Typography>
                  <Typography
                    sx={{ marginTop: "4px", fontSize: 14 }}
                    variant="h7"
                    component="div"
                  >
                    {invoice.accountNumber}
                  </Typography>
                </Stack>
              </Box>
              <Box sx={{ width: "50%" }}>
                <Typography variant="h6" component="div">
                  {Number(total.grossValue).toFixed(2)} USD due{" "}
                  {dateReadable(invoice.deadlinePayments)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
