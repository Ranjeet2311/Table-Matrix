import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import letterGenerator from "./lettersGenerator";
import { makeStyles } from "@material-ui/core/styles";

// const customeStyle = {
//   margin: "0px",
//   color: "green",
//   fontSize: "2rem",
//   borderBottom: "10px solid black",
// };

// const useStyles = makeStyles({
//   sticky: {
//     position: "sticky",
//     left: 0,
//     background: "white",
//     boxShadow: "5px 2px 5px grey",
//   },
// });

// const classes = useStyles();

function SelectTable({ selected }) {
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);

  const tableCells = new Array(50);

  useEffect(() => {
    for (let n = 0; n < 50; n++) {
      console.log("UseEffcet Column Loop");
      setColumn((preVal) => {
        return [...preVal, letterGenerator(n)];
      });
      // console.log(colName(n));
    }
    for (let n = 0; n < 200; n++) {
      console.log("UseEffcet row Loop");
      setRow((preVal) => {
        return [...preVal, letterGenerator(n)];
      });
      // console.log(setRow(n));
    }
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {column &&
            column.map((col, i) => {
              return (
                <>
                  <TableCell>{col}</TableCell>
                </>
              );
            })}
        </TableRow>
      </TableHead>
      <TableBody>
        {row &&
          row.map((r, i) => {
            return (
              <TableRow>
                <TableCell key={i}>{r}</TableCell>
                {tableCells.fill(0).map((_, index) => (
                  <TableCell
                    className={
                      selected.has(index) ? "selected selectable" : "selectable"
                    }
                    data-key={index}
                    key={index}
                  ></TableCell>
                ))}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default SelectTable;
