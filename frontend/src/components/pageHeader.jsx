import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export const PageHeader = ({ title, button }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h1" fontSize={36} fontWeight={400} marginTop={2}>
        {title}
      </Typography>
      {button && (
        <Button variant="contained" startIcon={<AddOutlinedIcon />}>
          Add
        </Button>
      )}
    </div>
  );
};
