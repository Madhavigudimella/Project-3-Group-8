import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import logo from "../assests/png.PNG";

function Header({ setgraphType, setlimit, limit }) {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    setgraphType(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "", justifyContent: "center", height: 80 }}
      >
        <img src={logo} alt="" srcset="" className="logo" />
        <Toolbar sx={{ justifyContent: "center" }}>
          <div style={{ display: "flex", "justify-content": "center" }}>
            <FormControl style={{ margin: 30, width: 100, color: "#1976d2" }}>
              <InputLabel
                id="demo-simple-select-label"
                sx={{ color: "#FFFFFF" }}
              >
                Limit
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={limit}
                label="Limit"
                onChange={(e) => {
                  setlimit(e.target.value);
                }}
                style={{ borderColor: "#FFFFFF" }}
                sx={{ color: "#FFFFFF", border: "1px solid #FFFFFF" }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                {/* <MenuItem value={100}>100</MenuItem> */}
              </Select>
            </FormControl>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ToggleButtonGroup
                color="secondary"
                value={alignment}
                exclusive
                onChange={handleChange}
                style={{ margin: 30, borderColor: "#FFFFFF" }}
                sx={{ color: "#FFFFFF", border: "1px solid #FFFFFF" }}
              >
                <ToggleButton
                  value="youtube"
                  sx={{ color: "#FFFFFF", border: "1px solid #FFFFFF" }}
                >
                  Youtube
                </ToggleButton>
                <ToggleButton
                  value="instagram"
                  sx={{ color: "#FFFFFF", border: "1px solid #FFFFFF" }}
                >
                  Instagram
                </ToggleButton>
                {/* <ToggleButton value="ios">iOS</ToggleButton> */}
              </ToggleButtonGroup>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
