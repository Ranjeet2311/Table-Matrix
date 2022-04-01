import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import letterGenerator from "./lettersGenerator";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    padding: " 10px 50px",
  },
  body: {
    fontSize: 12,
    width: "20px",
    height: " 10px",
    padding: " 10px 50px",
    border: "1px solid grey",
  },
}))(TableCell);

function SelectTable({ selected }) {
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);

  const tableRowCells = new Array(50);
  const boxes = tableRowCells
    .fill(0)
    .map((_, index) => (
      <StyledTableCell
        className={selected.has(index) ? "selected selectable" : "selectable"}
        data-key={index}
        key={index}
      ></StyledTableCell>
    ));

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
          <StyledTableCell></StyledTableCell>
          {column &&
            column.map((col, i) => {
              return <StyledTableCell key={i}>{col}</StyledTableCell>;
            })}
        </TableRow>
      </TableHead>
      <TableBody>
        {row &&
          row.map((r, i) => {
            return (
              <TableRow key={i}>
                <StyledTableCell>{r}</StyledTableCell>
                {boxes}
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}

export default SelectTable;
