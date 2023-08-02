import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";

export const SettingCard = ({ title, desc, content, submit, loading }) => {
  return (
    <Card sx={{ width: "50%", marginTop: 3, padding: 3 }} variant="outlined">
      <Typography variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" marginTop={1}>
        {desc}
      </Typography>
      <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {content}
        </Grid>
        <LoadingButton
          type="submit"
          loading={loading}
          loadingIndicator="Loading…"
          variant="contained"
          sx={{ mt: 3 }}
        >
          <span>Save</span>
        </LoadingButton>
      </Box>
    </Card>
  );
};
