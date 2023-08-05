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

export const SingleInvoice = () => {
  const { id } = useParams();
  console.log(id);
  return (
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
          <Typography variant="h5">NR123456</Typography>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
          <Button variant="contained" startIcon={<EditNoteOutlinedIcon />}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<FileDownloadOutlinedIcon />}>
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
                <Typography sx={{ fontSize: 14 }} variant="h7" component="div">
                  NR123456
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  Bodzentyn
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  4 August 2023
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  4 August 2023
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
                  Company One
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  NIP: 123142142
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  Kowalskiego 12
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  00-001 Warszaw
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
                  Company Two
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  NIP: 012091284
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  Nowakowska 12
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  22-102 Góra Kalwari
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box sx={{ marginBottom: 4 }}>
            <Typography sx={{ fontWeight: "500" }} variant="h7" component="div">
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
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          Item One
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          1
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          100
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          100
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          23%
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          23
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          123
                        </Typography>
                      </TableCell>
                    </TableRow>
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
                          100
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          23
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          sx={{ fontSize: 14 }}
                          variant="h7"
                          component="div"
                        >
                          123
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
                <Typography sx={{ fontSize: 14 }} variant="h7" component="div">
                  4 August 2023
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  Cash
                </Typography>
                <Typography
                  sx={{ marginTop: "4px", fontSize: 14 }}
                  variant="h7"
                  component="div"
                >
                  12312312321112312321
                </Typography>
              </Stack>
            </Box>
            <Box sx={{ width: "50%" }}>
              <Typography variant="h6" component="div">
                120,00 USD due 4 August 2023
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
