import { useState, useEffect } from "react";

const useFetch = ({ url, method = "GET", body = null, headers = {} }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requestOptions = {
          method,
          headers: { "Content-Type": "application/json", ...headers },
        };

        // Conditionally add body for methods that use it
        if (method !== "GET" && method !== "DELETE")
          requestOptions.body = JSON.stringify(body);

        const response = await fetch(url, requestOptions);
        if (!response.ok)
          throw new Error(
            `Network response was not ok (${response.statusText})`
          );

        // Not all responses have a body (e.g., DELETE), handle accordingly
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const jsonData = await response.json();
          setData(jsonData);
        } else {
          setData(null);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Ensure useEffect is not triggered too frequently by verifying specific changes
  }, [url, method, JSON.stringify(body), JSON.stringify(headers)]);

  return { data, loading, error };
};

export default useFetch;
