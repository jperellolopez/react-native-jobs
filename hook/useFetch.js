import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  

  {
    /* Options object from the RapidAPI website. Changes: endpoint template passed as a prop, X-RapidAPI-Key set as an env variable, params is an object based on a query data passed as a prop
    a95d6c9046msh437b60696a0d339p1c0f82jsn4d408a1190da -- account 1 limit exceeded
     */
  }
  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    params: { ...query },
    headers: {
      "X-RapidAPI-Key": '479bd19025mshfc2f2b35ae011cbp16d6a8jsn71a650ee6941',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
  };

  {
    /* Function to request the data: creates a request with the options previously defined  */
  }
  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      //alert("Error en la solicitud de datos");
    } finally {
      setIsLoading(false);
    }
  };

  {/* UseEffect that executes the Function to fetch the data  */}
  useEffect(() => {
    fetchData()
  }, []);

  {/* If the first fetch fails, this will repeat it */}
  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return {data, isLoading, error, refetch}

};

export default useFetch