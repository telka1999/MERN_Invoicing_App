import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";

export const PageHeader = ({ title, button, link }) => {
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
        <Link to={link}>
          <Button variant="contained" startIcon={<AddOutlinedIcon />}>
            Add
          </Button>
        </Link>
      )}
    </div>
  );
};
