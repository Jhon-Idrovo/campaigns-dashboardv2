import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import {
  HeaderMappingInterface,
  Row,
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
    tempRows.sort(
      compareValues(
        headersMap.find(({ header }) => header === orderBy)?.key,
        order
      )
    );
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
                  <li className="px-2" key={"menu-" + key}>
                    <input
                      type="checkbox"
                      id={key + "checkbox"}
                      checked={displayRowKeys.includes(key)}
                      onChange={() => handleDisplayCheck(key)}
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
              const header = headers[k] as keyof typeof rows[0];
              return (
                <th
                  className="text-txt-base text-right pl-4"
                  key={"header-" + header}
                >
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

function compareValues(orderBy: keyof Row, order: Order) {
  return function (rowA: Row, rowB: Row) {
    //the property does not exist in either of the rows
    if (!rowA.hasOwnProperty(orderBy) || !rowB.hasOwnProperty(orderBy))
      return 0;
    //extract values to compare
    const valA =
      typeof rowA[orderBy] === "string"
        ? rowA[orderBy].toUpperCase()
        : rowA[orderBy];
    const valB =
      typeof rowB[orderBy] === "string"
        ? rowB[orderBy].toUpperCase()
        : rowB[orderBy];

    //run the comparission
    let comparission = 0; //default case valA = valB
    valA > valB ? (comparission = 1) : (comparission = -1);
    //order transformation, if neccesary
    return order === "desc" ? comparission * -1 : comparission;
  };
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
