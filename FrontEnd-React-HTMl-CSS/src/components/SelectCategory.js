import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function SelectCategory(props) {
  const categories = [
    "Sports",
    "Celebrity/ Entertainment",
    "Travel/ Lifestyle",
    "Fashion/ Beauty",
    "Food",
    "Family/ Home/ Parenting",
    "Health/ Fitness",
    "Business/ Tech/ Gaming",
    "Automotive",
    "Education",
  ];
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          onChange={(e) => {
            props.setcategory(e.target.value);
          }}
        >
          {categories.map((c) => {
            return (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            );
          })}
          {/* <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectCategory;
