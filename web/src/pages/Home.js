import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Paper from "@material-ui/core/Paper";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import { getRandomFloat, getRandomInt, getrandomString } from "../utils";
import { useHistory } from "react-router-dom";

import axios from "axios";

const Home = () => {
  const [num, setNum] = React.useState(true);
  const [float, setFloat] = React.useState(true);
  const [alpha, setAlpha] = React.useState(true);
  const [size, setSize] = React.useState("10");

  const history = useHistory();

  let [numValue, setNumValue] = React.useState(0);
  let [fValue, setFValue] = React.useState(0);
  let [alphaValue, setAlValue] = React.useState(0);

  const [allValue, setAll] = React.useState({});

  const [isGen, setIsGen] = React.useState(false);

  const [counter, setCounter] = React.useState("");

  const handleNumber = (event) => {
    setNum(event.target.checked);
  };
  const handleFloat = (event) => {
    setFloat(event.target.checked);
  };

  const handleAlpha = (event) => {
    setAlpha(event.target.checked);
  };

  const startGenrate = () => {
    let Nlist = [];
    let Flist = [];
    let Alist = [];

    let timer = setInterval(() => {
      if (num) {
        let genInt = getRandomInt(1, 1000);
        setNumValue(numValue++);
        Nlist.push(genInt);
      }
      if (float) {
        let genF = getRandomFloat(1, 1000);
        setFValue(fValue++);
        Flist.push(genF);
      }
      if (alpha) {
        let genAlpha = getrandomString();
        setAlValue(alphaValue++);
        Alist.push(genAlpha);
      }

      console.log(Nlist, Flist, Alist);

      let val = {
        numbers: Nlist,
        floats: Flist,
        alphas: Alist,
      };

      setAll(val);
    }, 1000);

    setCounter(timer);
  };

  const stopGenrate = () => {
    clearInterval(counter);
  };

  const generateRport = async () => {
    try {
      let { data } = await axios.post("http://localhost:5000/storefile", {
        values: allValue,
      });
      console.log(data);

      if (data?.message) {
        history.push("/report");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div class="container" style={{ marginTop: "20px" }}>
        <div class="row ">
          <div class="col-sm">
            <div className="row">
              <div className="col-sm">
                <Checkbox
                  checked={num}
                  onChange={handleNumber}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label>Numeric</label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <Checkbox
                  checked={float}
                  onChange={handleFloat}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label>Float</label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm">
                <Checkbox
                  checked={alpha}
                  onChange={handleAlpha}
                  inputProps={{ "aria-label": "secondary checkbox" }}
                />
                <label>Alphanumeric</label>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <TextField
              id="standard-basic"
              label="size of the file (KB)"
              inputProps={{ maxLength: 3 }}
              value={size}
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div class="container" style={{ marginTop: "20px" }}>
        <div class="row">
          <div class="col">
            <Button variant="contained" color="primary" onClick={startGenrate}>
              Start
            </Button>
          </div>
          <div class="col">
            <Button variant="contained" color="primary" onClick={stopGenrate}>
              Stop
            </Button>
          </div>
        </div>
      </div>
      <div class="container" style={{ marginTop: "20px" }}>
        <div class="row">
          <div class="col-sm">
            <label>Counter 1 (Numeric)</label>
          </div>
          <div class="col-sm">
            <TextField id="standard-basic" value={numValue} />
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <label>Counter 2 (Float)</label>
          </div>
          <div class="col-sm">
            <TextField id="standard-basic" value={fValue} />
          </div>
        </div>
        <div class="row">
          <div class="col-sm">
            <label>Counter 3 (Alphanumeric)</label>
          </div>
          <div class="col-sm">
            <TextField id="standard-basic" value={alphaValue} />
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={generateRport}>
          Generate Report
        </Button>
      </div>
    </div>
  );
};

export default Home;
