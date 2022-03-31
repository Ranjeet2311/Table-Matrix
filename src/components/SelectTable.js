import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import letterGenerator from "./lettersGenerator";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function SelectTable({ selected }) {
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);

  const tableCells = new Array(50);

  useEffect(() => {
    for (let n = 0; n < 50; n++) {
      setColumn((preVal) => {
        return [...preVal, letterGenerator(n)];
      });
    }
    for (let n = 0; n < 200; n++) {
      setRow((preVal) => {
        return [...preVal, letterGenerator(n)];
      });
    }
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          {column &&
            column.map((col, i) => {
              return <TableCell key={i}>{col}</TableCell>;
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
