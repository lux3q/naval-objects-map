import './App.css';
import React, {useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CreateTable from './components/Table/CreateTable';
import CreateMap from './components/Map/CreateMap';
import Nav from './components/Nav';

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`https://plovput.li-st.net/getObjekti/`)
      .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [])

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route index element={<Home />} />
          <Route path="map" element={<CreateMap data = {data} loading = {loading} error = {error} />} />
          <Route path="table" element={<CreateTable data = {data} loading = {loading} error = {error}  />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
