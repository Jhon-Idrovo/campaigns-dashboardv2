import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { TablePropsInterface } from "../lib/ts/interfaces";

type Order = "asc" | "desc";

function Table({ headersMap, rows, Body }: TablePropsInterface) {
  //-----------ORDER AND SORTING----------------------
  const [order, setOrder] = useState<Order>("asc");
  //based on the headers
  const [orderBy, setOrderBy] = useState<string>(headersMap[0].header);
  useEffect(() => {
    rowsMergeSort<typeof rows[0]>(
      rows,
      0,
      rows.length - 1,
      headersMap.filter(({ header }) => header === orderBy)[0].key,
      order
    );
  }, [orderBy, order]);
  const handleRequestSort = (header: string) => {
    //determine the sorting order. If we don't have the table already sorted
    //with the same column, we need to start sortin ascendently
    const isAsc = orderBy === header && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(header);
  };

  //-----------------DISPLAY---------------------
  const [dense, setDense] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  //displayed rows
  const [displayRowKeys, setDisplayRowKeys] = useState<string[]>(() => {
    let headerKeys: string[] = [];
    headersMap.map(({ key }) => headerKeys.push(key));
    return headerKeys;
  });

  const handleDisplayCheck = (key: string) => {
    const kIndex = displayRowKeys.indexOf(key);
    let newHiddenRows = [...displayRowKeys];
    kIndex === -1 ? newHiddenRows.push(key) : newHiddenRows.splice(kIndex, 1);
    setDisplayRowKeys(newHiddenRows);
  };

  //-------------TABLE MENU--------------
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <>
      <table className="w-full">
        <thead>
          <tr>
            <th>
              <button>
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            </th>
            {headersMap.map(({ header, key }) =>
              //since the display list comes from the headers list, it maintains the order
              displayRowKeys.includes(key) ? (
                <th className="text-txt-base">
                  <button>
                    {orderBy === header ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        {...(order === "desc" ? { flip: "vertical" } : null)}
                        onClick={() =>
                          setOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                        }
                      />
                    ) : null}
                    {header}
                  </button>
                </th>
              ) : null
            )}
          </tr>
        </thead>
        <Body rows={rows} displayRowKeys={displayRowKeys} />
      </table>
    </>
  );
}

export default Table;

function rowsMergeSort<T>(
  rows: T[],
  l: number,
  r: number,
  orderBy: string,
  order: Order
) {
  //T is the type of one row, not the list of them
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  rowsMergeSort(rows, l, m, orderBy, order);
  rowsMergeSort(rows, m + 1, r, orderBy, order);
  merge<T>(rows, l, m, r, orderBy, order);
}
function merge<T>(
  arr: T[],
  l: number,
  m: number,
  r: number,
  orderBy: string,
  order: Order
) {
  const lengthL = m - l + 1;
  const lengthR = r - m;

  let L = Array(lengthL);
  let R = Array(lengthR);
  //temp arrays
  for (let i = 0; i < lengthL; i++) {
    L[i] = arr[l + i];
  }
  for (let i = 0; i < lengthR; i++) {
    R[i] = arr[m + 1 + i];
  }

  //merging temp arrays back to the orinignal one
  let lIndex, rIndex;
  lIndex = rIndex = 0;
  let arrIndex = 0;
  while (lIndex < lengthL && rIndex < lengthR) {
    //compare the rows
    //orderBy is a key and L[lindex] is an object

    //descendent order
    if (order === "desc") {
      if (L[lIndex][orderBy] <= R[rIndex][orderBy]) {
        arr[arrIndex] = L[lIndex];
        lIndex++;
      } else {
        arr[arrIndex] = R[rIndex];
        rIndex++;
      }
    }
    //ascendent order
    if (order === "asc") {
      if (L[lIndex][orderBy] >= R[rIndex][orderBy]) {
        arr[arrIndex] = L[lIndex];
        lIndex++;
      } else {
        arr[arrIndex] = R[rIndex];
        rIndex++;
      }
    }
    arrIndex++;
    //copying the remaining elements of R or L, if any
    while (lIndex < lengthL) {
      arr[arrIndex] = L[lIndex];
      lIndex++;
      arrIndex++;
    }
    while (rIndex < lengthR) {
      arr[arrIndex] = R[rIndex];
      rIndex++;
      arrIndex++;
    }
  }
}
