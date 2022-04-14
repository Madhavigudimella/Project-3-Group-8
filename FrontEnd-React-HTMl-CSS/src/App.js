import "./App.css";
import * as React from "react";
import Header from "./components/Header";
import BarChart from "./components/BarChart";
import WorldMap from "./components/WorldMap";
import SelectCountry from "./components/SelectCountry";
import SelectCategory from "./components/SelectCategory";
import { useState, useEffect } from "react";
import { api } from "./webService/Api";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import chatbot from "../src/assests/chatbot.png";
import { theme } from "./components/chatbotTheme";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  const [limit, setlimit] = useState(10);
  const [graphType, setgraphType] = useState("youtube");
  const [dataBar, setdataBar] = useState([]);
  const [dataMap, setdataMap] = useState([]);
  const [country, setcountry] = useState();
  const [category, setcategory] = useState();
  const [topInfulencers, settopInfulencers] = useState(" ");
  const [modal, setmodal] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetch(`${api}getInfluencerGraph?graphType=${graphType}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => {
        setdataBar(res);
      });
    fetch(`${api}getInfluencerMap?graphType=${graphType}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => {
        setdataMap(res);
      });
  }, [limit, graphType]);

  useEffect(() => {
    if (category && country) {
      fetch(`${api}getChatBotInfo?category=${category}&region=${country}`)
        .then((res) => res.json())
        .then((res) => {
          settopInfulencers(res);
          handleOpen();
        });
    }
  }, [category, country]);

  const printMessage = () => {
    const rows = [];
    const insta_row = [];

    if (topInfulencers !== [] && topInfulencers.length > 0) {
      let youtubestr = "";

      for (let i = 0; i < topInfulencers.length; i++) {
        if (topInfulencers[i]["youtube"] !== undefined) {
          rows.push(topInfulencers[i]["youtube"]);
        }
        if (topInfulencers[i]["instagram"] !== undefined) {
          insta_row.push(topInfulencers[i]["instagram"]);
        }
      }

      return (
        <>
          <b>Youtube</b>
          <br></br>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Subscribers</TableCell>
                  <TableCell align="right">Avg Views</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.followers}</TableCell>
                    <TableCell align="right">{row.views}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <br></br>
          <b>Instagram</b>
          <br></br>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Subscribers</TableCell>
                  <TableCell align="right">Avg Views</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {insta_row.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.followers}</TableCell>
                    <TableCell align="right">{row.views}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    } else {
      return "No data found for your search";
    }
  };

  const csvData = [
    ["firstname", "lastname", "email"],
    ["John", "Doe", "john.doe@xyz.com"],
    ["Jane", "Doe", "jane.doe@xyz.com"],
  ];

  const steps = [
    {
      id: "start",
      message:
        " Do you need any assistance in finding the best influencer for your product?",
      trigger: "AskAssist",
    },
    {
      id: "AskAssist",
      options: [
        { value: "Yes", label: "Yes", trigger: "PleaseSelectCountry" },
        { value: "No", label: "No", trigger: "Close" },
      ],
    },
    {
      id: "PleaseSelectCountry",
      message: "Please select a country",
      trigger: "SelectCountry",
    },
    {
      id: "SelectCountry",

      component: <SelectCountry country={country} setcountry={setcountry} />,
      trigger: "PleaseSelectCategory",
    },

    {
      id: "PleaseSelectCategory",
      message: "Please select a Category",
      trigger: "SelectCategory",
    },
    {
      id: "SelectCategory",
      component: (
        <SelectCategory category={category} setcategory={setcategory} />
      ),
    },
    {
      id: "Close",
      message: "Thanks, Have a Good Day",
      end: true,
    },
  ];
  const config = {
    botAvatar: chatbot,
    floating: true,
  };
  return (
    <div className="App">
      <Header setgraphType={setgraphType} setlimit={setlimit} limit={limit} />
      <BarChart data={dataBar} graphType={graphType} />
      <WorldMap dataMap={dataMap} />
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="SM Analytics"
          steps={steps}
          {...config}
          opened={true}
        />
      </ThemeProvider>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Top Influencers
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {printMessage()}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
