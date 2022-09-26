import React, {useState, useEffect, createContext} from "react";

const DataContext = createContext();

const DataProvider = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts?_limit=8`)
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
      }, []);
    
      return (
             <DataContext.Provider value={{ data, loading, error}}>
              {children}
             </DataContext.Provider>
      );
    }

    const withData = (Child) => (props) => (
      <DataContext.Consumer>
        {(context) => <Child {...props} {...context} />}
      </DataContext.Consumer>
    );

    export { DataProvider, withData };
