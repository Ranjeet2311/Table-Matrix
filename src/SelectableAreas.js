import SelectionArea, { SelectionEvent } from "@viselect/react";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function SelectableAreas() {
  const [selected, setSelected] = useState(() => new Set());
  const [column, setColumn] = useState([]);
  const [row, setRow] = useState([]);

  // -----generating letters---

  const box = new Array(5)
    .fill(0)
    .map((_, index) => (
      <div
        className={selected.has(index) ? "selected selectable" : "selectable"}
        data-key={index}
        key={index}
      />
    ));

  function colName(n) {
    var codeA = "a".charCodeAt(0);
    var codeZ = "z".charCodeAt(0);
    var len = codeZ - codeA + 1;

    var s = "";
    while (n >= 0) {
      s = String.fromCharCode((n % len) + codeA) + s;
      n = Math.floor(n / len) - 1;
    }

    return s.toUpperCase();
  }
  function rowName(n) {
    var codeA = "a".charCodeAt(0);
    var codeZ = "z".charCodeAt(0);
    var len = codeZ - codeA + 1;

    var s = "";
    while (n >= 0) {
      s = String.fromCharCode((n % len) + codeA) + s;
      n = Math.floor(n / len) - 1;
    }

    return s.toUpperCase();
    // return s.toUpperCase() + box;
  }

  useEffect(() => {
    for (let n = 0; n < 50; n++) {
      console.log("UseEffcet Column Loop");
      setColumn((prVal) => {
        return [...prVal, colName(n)];
      });
      // console.log(colName(n));
    }
    for (let n = 0; n < 200; n++) {
      console.log("UseEffcet row Loop");
      setRow((prVal) => {
        return [...prVal, rowName(n)];
      });
      // console.log(setRow(n));
    }
  }, []);

  // console.log(column);
  // console.log(row);

  // ------

  const extractIds = (els) =>
    els
      .map((v) => v.getAttribute("data-key"))
      .filter(Boolean)
      .map(Number);

  const onStart = ({ event, selection }) => {
    if (!event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelected(() => new Set());
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }) => {
    setSelected((prev) => {
      const next = new Set(prev);
      extractIds(added).forEach((id) => next.add(id));
      extractIds(removed).forEach((id) => next.delete(id));
      return next;
    });
  };

  return (
    <SelectionArea
      className="container"
      onStart={onStart}
      onMove={onMove}
      selectables=".selectable"
    >
      <Table>
        <TableHead>
          <TableRow className="TableCell">
            <TableCell></TableCell>
            {column &&
              column.map((col, i) => {
                return (
                  <>
                    <TableCell key={i}>{col}</TableCell>
                  </>
                );
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* <TableRow></TableRow> */}

          {row &&
            row.map((r, i) => {
              return (
                <TableRow>
                  <TableCell key={i}>{r}</TableCell>
                  {new Array(50).fill(0).map((_, index) => (
                    <TableCell
                      className={
                        selected.has(index)
                          ? "selected selectable"
                          : "selectable"
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
    </SelectionArea>
  );
}

export default SelectableAreas;
