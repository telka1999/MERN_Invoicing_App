import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import OutlinedInput from "@mui/material/OutlinedInput";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const AddInvoice = () => {
  return (
    <Card sx={{ marginTop: 3, padding: 3 }} variant="outlined">
      <Typography variant="h5" component="div">
        Create Invoice
      </Typography>
      <Typography variant="body2" marginTop={1}>
        File out form in order to create invoice.
      </Typography>
      <Box component="form" noValidate onSubmit={() => {}} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              name="invoiceNr"
              fullWidth
              id="invoiceNr"
              label="Invoice Nr"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              name="placeOfIssue"
              fullWidth
              id="placeOfIssue"
              label="Place Of Issue"
            />
          </Grid>
          <Grid item xs={3} style={{ paddingTop: "8px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Date Of Issue" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3} style={{ paddingTop: "8px" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Sale Date" />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} marginTop={1}>
            <Box>
              <Typography
                variant="h6"
                style={{ fontWeight: "400", marginBottom: 8 }}
                component="div"
              >
                Seller
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="companyName"
                    fullWidth
                    id="companyName"
                    label="Company Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="nip" fullWidth id="nip" label="NIP" />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="code"
                    label="Code"
                    name="code"
                    autoComplete="code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6} marginTop={1}>
            <Box>
              <Typography
                variant="h6"
                style={{ fontWeight: "400", marginBottom: 8 }}
                component="div"
              >
                Buyer
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="companyName"
                    fullWidth
                    id="companyName"
                    label="Company Name"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField name="nip" fullWidth id="nip" label="NIP" />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="code"
                    label="Code"
                    name="code"
                    autoComplete="code"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="street"
                    label="Street"
                    name="street"
                    autoComplete="street"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <Box>
              <Typography
                variant="h6"
                style={{ fontWeight: "400", marginBottom: 8 }}
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
                      <TableRow>
                        <TableCell sx={{ width: "35%" }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <CloseOutlinedIcon
                              color="primary"
                              style={{ cursor: "pointer" }}
                            />
                            <OutlinedInput fullWidth />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <OutlinedInput type="number" fullWidth />
                        </TableCell>
                        <TableCell>
                          <OutlinedInput type="number" fullWidth />
                        </TableCell>
                        <TableCell>
                          <OutlinedInput
                            type="number"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                            disabled
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={23}
                            fullWidth
                            displayEmpty
                            inputProps={{ "aria-label": "Without label" }}
                          >
                            <MenuItem value={10}>10%</MenuItem>
                            <MenuItem value={23}>23%</MenuItem>
                            <MenuItem value={30}>30%</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <OutlinedInput
                            type="number"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                            disabled
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <OutlinedInput
                            type="number"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                            disabled
                            fullWidth
                          />
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell sx={{ width: "35%" }}>
                          <Button
                            variant="outlined"
                            startIcon={<AddOutlinedIcon />}
                          >
                            Add Item
                          </Button>
                        </TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell>
                          <Typography variant="h6" component="div">
                            Total:
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <OutlinedInput
                            type="number"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                            disabled
                            fullWidth
                          />
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          <OutlinedInput
                            type="number"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                            disabled
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <OutlinedInput
                            type="number"
                            style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                            disabled
                            fullWidth
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={3} marginTop={2}>
            <TextField
              name="paymentMethod"
              fullWidth
              id="paymentMethod"
              label="Payment Method"
            />
          </Grid>
          <Grid item xs={9} marginTop={2}>
            <TextField
              name="accountNumber"
              fullWidth
              id="accountNumber"
              label="Account Number"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <LoadingButton
            type="submit"
            loading={false}
            loadingIndicator="Loading…"
            variant="contained"
            sx={{ mt: 3 }}
          >
            <span>Create Invoice</span>
          </LoadingButton>
        </Box>
      </Box>
    </Card>
  );
};
