import Typography from "@mui/material/Typography";

export const PageHeader = ({ title }) => {
  return (
    <Typography variant="h1" fontSize={36} fontWeight={400} marginTop={2}>
      {title}
    </Typography>
  );
};
