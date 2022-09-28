import React, { useState } from "react";
import "./table.css";

const pageSize = 20;

const CreateTable = ({ data, loading, error }) => {
  const [page, setPage] = useState(1);

  const firstPage = () => {
    setPage(1);
  };

  const decrementPage = () => {
    let newPageNumber = page - 1;
    if (newPageNumber < 1) {
      newPageNumber = 1;
    }
    setPage(newPageNumber);
  };

  const incrementPage = () => {
    const maxPage = Math.ceil(data.features.length / pageSize);
    let newPageNumber = page + 1;
    if (newPageNumber > maxPage) {
      newPageNumber = maxPage;
    }
    setPage(newPageNumber);
  };

  const lastPage = () => {
    const maxPage = Math.ceil(data.features.length / pageSize);
    setPage(maxPage);
  };

  if (loading) {
    return <div className="loading-msg">A moment please...</div>;
  }

  if (error) {
    return (
      <div className="error-msg">{`There is a problem with fetching data - ${error}`}</div>
    );
  }

  if (!data.hasOwnProperty("features")) {
    return <div></div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Naziv Objekta</th>
            <th>Ps Broj</th>
            <th>E broj</th>
            <th>Tip Objekta</th>
            <th>Lučka Kapetanija</th>
          </tr>
        </thead>
        <tbody>
          {data.features
            .slice((page - 1) * pageSize, page * pageSize)
            .map((element, elementIndex) => (
              <tr key={elementIndex}>
                <td>{element.properties.naziv_objekta || "-"}</td>
                <td>{element.properties.ps_br || "-"}</td>
                <td>{element.properties.e_br || "-"}</td>
                <td>{element.properties.tip_objekta || "-"}</td>
                <td>{element.properties.lucka_kapetanija || "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        <button onClick={firstPage}>First</button>
        <button onClick={decrementPage}>-</button>
        {page}
        <button onClick={incrementPage}>+</button>
        <button onClick={lastPage}>Last</button>
      </div>
    </div>
  );
};

export default CreateTable;
