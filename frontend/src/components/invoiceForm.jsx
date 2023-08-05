import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
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
import dayjs from "dayjs";

export const InvoiceForm = ({
  basicInfo,
  seller,
  buyer,
  items,
  saveInvoice,
  handleChangesBasicInfo,
  handleDatePicker,
  handleChangesSeller,
  handleChangesBuyer,
  handleChangesItems,
  deleteItem,
  addItem,
  totalNetValue,
  totalVatSum,
  totalGrossValue,
  loading,
}) => {
  return (
    <Box
      component="form"
      noValidate
      onSubmit={(e) => saveInvoice(e)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            onChange={(e) => handleChangesBasicInfo(e, "invoiceNr")}
            value={basicInfo.invoiceNr}
            name="invoiceNr"
            fullWidth
            id="invoiceNr"
            label="Invoice Nr"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            onChange={(e) => handleChangesBasicInfo(e, "placeOfIssue")}
            value={basicInfo.placeOfIssue}
            name="placeOfIssue"
            fullWidth
            id="placeOfIssue"
            label="Place Of Issue"
          />
        </Grid>
        <Grid item xs={3} style={{ paddingTop: "8px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={basicInfo.dateOfIssue ? basicInfo.dateOfIssue : dayjs()}
                onChange={(value) => handleDatePicker(value, "dateOfIssue")}
                label="Date Of Issue"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3} style={{ paddingTop: "8px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Sale Date"
                value={basicInfo.saleDate ? basicInfo.saleDate : dayjs()}
                onChange={(value) => handleDatePicker(value, "saleDate")}
              />
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
                  value={seller.companyName}
                  onChange={(e) => handleChangesSeller(e, "companyName")}
                  name="companyName"
                  fullWidth
                  id="companyName"
                  label="Company Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={seller.nip}
                  onChange={(e) => handleChangesSeller(e, "nip")}
                  name="nip"
                  fullWidth
                  id="nip"
                  label="NIP"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={seller.code}
                  onChange={(e) => handleChangesSeller(e, "code")}
                  fullWidth
                  id="code"
                  label="Code"
                  name="code"
                  autoComplete="code"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={seller.street}
                  onChange={(e) => handleChangesSeller(e, "street")}
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoComplete="street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={seller.city}
                  onChange={(e) => handleChangesSeller(e, "city")}
                  name="city"
                  fullWidth
                  id="city"
                  label="City"
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
                  value={buyer.compnayName}
                  onChange={(e) => handleChangesBuyer(e, "compnayName")}
                  name="companyName"
                  fullWidth
                  id="companyName"
                  label="Company Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={buyer.nip}
                  onChange={(e) => handleChangesBuyer(e, "nip")}
                  name="nip"
                  fullWidth
                  id="nip"
                  label="NIP"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={buyer.code}
                  onChange={(e) => handleChangesBuyer(e, "code")}
                  fullWidth
                  id="code"
                  label="Code"
                  name="code"
                  autoComplete="code"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={buyer.street}
                  onChange={(e) => handleChangesBuyer(e, "street")}
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoComplete="street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={buyer.city}
                  onChange={(e) => handleChangesBuyer(e, "city")}
                  name="city"
                  fullWidth
                  id="city"
                  label="City"
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
                    {items.map((item, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell sx={{ width: "35%" }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <CloseOutlinedIcon
                                onClick={() => deleteItem(i)}
                                color="primary"
                                style={{ cursor: "pointer" }}
                              />
                              <OutlinedInput
                                value={item.itemName}
                                onChange={(e) =>
                                  handleChangesItems(e, i, "itemName")
                                }
                                fullWidth
                              />
                            </Box>
                          </TableCell>
                          <TableCell>
                            <OutlinedInput
                              value={Math.abs(Number(item.quantity))}
                              onChange={(e) =>
                                handleChangesItems(e, i, "quantity")
                              }
                              type="number"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <OutlinedInput
                              value={Math.abs(Number(item.netPrice)).toFixed(2)}
                              onChange={(e) =>
                                handleChangesItems(e, i, "netPrice")
                              }
                              type="number"
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <OutlinedInput
                              value={Math.abs(Number(item.netValue)).toFixed(2)}
                              type="number"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.06)",
                              }}
                              disabled
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.vat}
                              onChange={(e) => handleChangesItems(e, i, "vat")}
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
                              value={Math.abs(Number(item.vatSum)).toFixed(2)}
                              type="number"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.06)",
                              }}
                              disabled
                              fullWidth
                            />
                          </TableCell>
                          <TableCell>
                            <OutlinedInput
                              value={Math.abs(Number(item.grossValue)).toFixed(
                                2
                              )}
                              type="number"
                              style={{
                                backgroundColor: "rgba(0, 0, 0, 0.06)",
                              }}
                              disabled
                              fullWidth
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell sx={{ width: "35%" }}>
                        <Button
                          onClick={addItem}
                          variant="outlined"
                          startIcon={<AddOutlinedIcon />}
                        >
                          Add Item
                        </Button>
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell>
                        <Typography
                          style={{ fontWeight: "400" }}
                          variant="h6"
                          component="div"
                        >
                          Total:
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <OutlinedInput
                          value={totalNetValue}
                          type="number"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                          disabled
                          fullWidth
                        />
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <OutlinedInput
                          value={totalVatSum}
                          type="number"
                          style={{ backgroundColor: "rgba(0, 0, 0, 0.06)" }}
                          disabled
                          fullWidth
                        />
                      </TableCell>
                      <TableCell>
                        <OutlinedInput
                          value={totalGrossValue}
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
        <Grid item xs={3} style={{ paddingTop: "8px" }} marginTop={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                value={
                  basicInfo.deadlinePayments
                    ? basicInfo.deadlinePayments
                    : dayjs()
                }
                onChange={(value) =>
                  handleDatePicker(value, "deadlinePayments")
                }
                label="Deadline Payments"
              />
            </DemoContainer>
          </LocalizationProvider>
        </Grid>
        <Grid item xs={3} marginTop={2}>
          <TextField
            onChange={(e) => handleChangesBasicInfo(e, "paymentMethod")}
            value={basicInfo.paymentMethod}
            name="paymentMethod"
            fullWidth
            id="paymentMethod"
            label="Payment Method"
          />
        </Grid>
        <Grid item xs={6} marginTop={2}>
          <TextField
            onChange={(e) => handleChangesBasicInfo(e, "accountNumber")}
            value={basicInfo.accountNumber}
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
          loading={loading}
          loadingIndicator="Loading…"
          variant="contained"
          sx={{ mt: 3 }}
        >
          <span>Create Invoice</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};
