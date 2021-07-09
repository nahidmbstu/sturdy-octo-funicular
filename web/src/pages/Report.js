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
  Paper,
} from "@material-ui/core";
import axios from "axios";

const Report = () => {
  let [datas, setData] = React.useState([]);
  const [num, setNum] = React.useState([]);
  const [float, setFloat] = React.useState([]);
  const [alpha, setAlpha] = React.useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let { data } = await axios.get("http://localhost:5000/readfile");
      console.log(data.data);

      setNum(data.data[0].split(","));
      setFloat(data.data[1].split(","));
      setAlpha(data.data[2].split(","));
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (datas) {
    return (
      <div style={{ marginTop: "20px" }}>
        <TableContainer component={Paper}>
          <Table className={""} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Number</TableCell>
                <TableCell>Float</TableCell>
                <TableCell>Numeric</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  {num.map((item) => (
                    <p>{item}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {float.map((item) => (
                    <p>{item}</p>
                  ))}
                </TableCell>
                <TableCell>
                  {alpha.map((item) => (
                    <p>{item}</p>
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
};

export default Report;
