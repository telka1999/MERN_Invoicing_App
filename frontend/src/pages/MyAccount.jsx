import { PageHeader } from "../components/pageHeader";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { SettingCard } from "../components/setting-card";
import Typography from "@mui/material/Typography";
import { useAuth } from "../context/authContext";
import { useToast } from "../context/toastContext";
import { useState } from "react";

export const MyAccount = () => {
  const { user, setUpdate } = useAuth();
  const [proflie, setProfile] = useState({
    email: user.email,
    fullName: user.name,
    password: "",
  });
  const [company, setCompany] = useState(user.company);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(false);
  const { setOpen, setMessage } = useToast();

  const handleChangeProfile = (e, name) => {
    const value = e.target.value;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeCompany = (e, name) => {
    const value = e.target.value;
    setCompany((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    if (
      !loadingProfile &&
      (proflie.fullName !== user.name ||
        proflie.email !== user.email ||
        proflie.password)
    ) {
      setLoadingProfile(true);
      try {
        let urlencoded = new URLSearchParams();
        urlencoded.append("name", proflie.fullName);
        urlencoded.append("email", proflie.email);
        urlencoded.append("password", proflie.password);
        const res = await fetch("/api/users/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlencoded,
          redirect: "follow",
        });
        const data = await res.json();
        if (data?.message) {
          setProfile({
            email: user.email,
            fullName: user.name,
            password: "",
          });
          setOpen(true);
          setMessage(data.message);
        } else {
          setProfile({
            email: data.email,
            fullName: data.name,
            password: "",
          });
          setUpdate(data);
          setOpen(true);
          setMessage("Successfully updated profile");
        }
        setLoadingProfile(false);
        console.log(data);
      } catch (error) {
        setLoadingProfile(false);
        setOpen(true);
        setMessage(error.message);
      }
    }
  };

  const saveCompany = async (e) => {
    e.preventDefault();
    if (
      !loadingCompany &&
      (company.compnayName !== user.company.compnayName ||
        company.code !== user.company.code ||
        company.nip !== user.company.nip ||
        company.street !== user.company.street ||
        company.city !== user.company.city)
    ) {
      try {
        let urlencoded = new URLSearchParams();
        urlencoded.append("compnayName", company.compnayName);
        urlencoded.append("code", company.code);
        urlencoded.append("nip", company.nip);
        urlencoded.append("street", company.street);
        urlencoded.append("city", company.city);
        const res = await fetch("/api/users/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: urlencoded,
          redirect: "follow",
        });
        const data = await res.json();
        if (data?.message) {
          setCompany(user.company);
          setOpen(true);
          setMessage(data.message);
        } else {
          setCompany({
            compnayName: data.company.compnayName,
            nip: data.company.nip,
            street: data.company.street,
            city: data.company.city,
            code: data.company.code,
          });
          setUpdate(data);
          setOpen(true);
          setMessage("Successfully updated profile");
        }
        setLoadingCompany(false);
      } catch (error) {
        setLoadingCompany(false);
        setOpen(true);
        setMessage(error.message);
      }
    }
  };

  return (
    <div>
      <PageHeader title="My Account" />
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
        <SettingCard
          title="Profile"
          desc="Here you can update your profile data."
          submit={(e) => saveProfile(e)}
          loading={loadingProfile}
          content={
            <>
              <Grid item xs={12}>
                <TextField
                  value={proflie.fullName}
                  onChange={(e) => handleChangeProfile(e, "fullName")}
                  autoComplete="given-name"
                  name="fullName"
                  required
                  fullWidth
                  id="fullName"
                  label="Full Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={proflie.email}
                  onChange={(e) => handleChangeProfile(e, "email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={proflie.password}
                  onChange={(e) => handleChangeProfile(e, "password")}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
                <Typography variant="body2" marginTop={1} color="gray">
                  * In order to change password write new above and click save
                  button.
                </Typography>
              </Grid>
            </>
          }
        />
        <SettingCard
          title="Company"
          desc="Here you can update your company data."
          submit={(e) => saveCompany(e)}
          loading={loadingCompany}
          content={
            <>
              <Grid item xs={12}>
                <TextField
                  value={company.compnayName}
                  onChange={(e) => handleChangeCompany(e, "compnayName")}
                  name="companyName"
                  fullWidth
                  id="companyName"
                  label="Company Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={company.nip}
                  onChange={(e) => handleChangeCompany(e, "nip")}
                  name="nip"
                  fullWidth
                  id="nip"
                  label="NIP"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={company.code}
                  onChange={(e) => handleChangeCompany(e, "code")}
                  fullWidth
                  id="code"
                  label="Code"
                  name="code"
                  autoComplete="code"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={company.street}
                  onChange={(e) => handleChangeCompany(e, "street")}
                  fullWidth
                  id="street"
                  label="Street"
                  name="street"
                  autoComplete="street"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={company.city}
                  onChange={(e) => handleChangeCompany(e, "city")}
                  fullWidth
                  name="city"
                  label="City"
                  id="city"
                  autoComplete="city"
                />
              </Grid>
            </>
          }
        />
      </Box>
    </div>
  );
};
