import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function SelectCountry({ country, setcountry }) {
  const countries = [
    "Spain",
    "Indonesia",
    "Russia",
    "Poland",
    "South Korea",
    "United States",
    "Thailand",
    "India",
    "Iraq",
    "Morocco",
    "Turkey",
    "Mexico",
    "Brazil",
    "Chile",
    "Iran",
    "Italy",
    "Colombia",
    "Argentina",
    "Philippines",
    "United Kingdom",
    "Germany",
    "Nigeria",
    "Serbia",
    "Albania",
    "United Arab Emirates",
    "China",
    "France",
    "Japan",
    "Egypt",
    "Syria",
    "Algeria",
    "Ukraine",
    "Ecuador",
    "Saudi Arabia",
    "Bangladesh",
    "Pakistan",
    "Peru",
  ];
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={(e) => {
            setcountry(e.target.value);
          }}
        >
          {countries.map((c) => {
            return <MenuItem value={c}>{c}</MenuItem>;
          })}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectCountry;
