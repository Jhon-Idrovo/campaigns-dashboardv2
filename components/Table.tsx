import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import {
  CampaignInterface,
  HeaderMappingInterface,
  TablePropsInterface,
} from "../lib/ts/interfaces";

type Order = "asc" | "desc";

function Table({ headersMap, rows, Body }: TablePropsInterface) {
  //-----------ORDER AND SORTING----------------------
  const [sortedRows, setSortedRows] = useState(rows);
  const [order, setOrder] = useState<Order>("asc");
  //based on the headers
  const [orderBy, setOrderBy] = useState<string>(headersMap[0].header);
  useEffect(() => {
    let tempRows = [...sortedRows];
    rowsMergeSort<typeof rows[0]>(
      tempRows,
      0,
      tempRows.length - 1,
      headersMap.filter(({ header }) => header === orderBy)[0].key,
      order
    );
    console.log(sortedRows === tempRows);
    setSortedRows(tempRows);
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
  //displayed rows and headers
  const { displayHeaders, headerKeys } = parseHeaders(headersMap);
  const [headers, setHeaders] = useState({ ...displayHeaders });
  const [displayRowKeys, setDisplayRowKeys] = useState<string[]>([
    ...headerKeys,
  ]);

  const handleDisplayCheck = (key: string) => {
    const kIndex = displayRowKeys.indexOf(key);
    let newHiddenRows = [...displayRowKeys];
    kIndex === -1 ? newHiddenRows.push(key) : newHiddenRows.splice(kIndex, 1);
    setDisplayRowKeys(newHiddenRows);
  };

  //-------------TABLE MENU--------------
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <div className="w-full h-full overflow-x-scroll">
      <table className="w-full">
        <thead>
          <tr>
            <th className="relative">
              <button
                className="relative overflow-visible w-max"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                <FontAwesomeIcon icon={faEllipsisH} className="text-txt-base" />
              </button>
              <ul
                className={`absolute top-full left-0 text-left  bg-secondary overflow-hidden ${
                  isMenuOpen
                    ? "w-max max-h-screen max-w-screen-sm p-2"
                    : "max-h-0 max-w-0"
                }`}
              >
                {headersMap.map(({ key, header }) => (
                  <li className="px-2">
                    <input
                      type="checkbox"
                      id={key + "checkbox"}
                      checked={displayRowKeys.includes(key)}
                      onClick={() => handleDisplayCheck(key)}
                    />
                    <label
                      className="text-txt-secondary pl-2"
                      htmlFor={key + "checkbox"}
                    >
                      {header}
                    </label>
                  </li>
                ))}
              </ul>
            </th>
            {displayRowKeys.map((k) => {
              const header = headers[k];
              return (
                <th className="text-txt-base text-right pl-4" key={header}>
                  <button onClick={() => handleRequestSort(header)}>
                    {orderBy === header ? (
                      <FontAwesomeIcon
                        icon={faChevronUp}
                        {...(order === "desc" ? { flip: "vertical" } : null)}
                      />
                    ) : null}
                    {header}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <Body rows={sortedRows} displayRowKeys={displayRowKeys} />
      </table>
    </div>
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

function parseHeaders(headersMap: HeaderMappingInterface[]) {
  let headerKeys: HeaderMappingInterface["key"][] = [];
  let displayHeaders = {};
  headersMap.map(({ key, header }) => {
    displayHeaders[key] = header;
    headerKeys.push(key);
  });
  return { headerKeys, displayHeaders };
}
