import axios from "axios";
import { useState, useEffect } from "react";

// const baseUrl = process.env.NODE_ENV === "production"
// 	? "https://bellvedi-tech-test-backend.herokuapp.com/"
// 	: "localhost:4000"
interface PathType {
  path: string[];
  cost: number;
}

export function MainComponent(): JSX.Element {
  const [allStations, setAllStations] = useState<string[]>([]);
  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");
  const [path, setPath] = useState<string | PathType>(
    "Please select 2 stations to find the shortest distance"
  );

  const getPath = async () => {
    try {
      if (from && to) {
        const response = await axios.get(
          `https://bellvedi-tech-test-backend.herokuapp.com/path/${from}/${to}`
        );
        console.log(response.data);

        setPath(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getAllStations = async () => {
      try {
        const response = await axios.get(
          `https://bellvedi-tech-test-backend.herokuapp.com/allStations`
        );
        console.log(response.data);

        setAllStations(response.data);
        console.log(allStations);
      } catch (err) {
        console.error(err);
      }
    };
    getAllStations();

    // eslint-disable-next-line
  }, [from, to]);

  return (
    <main>
      <div className="title-section">
        <div className="container">
          <h2 className="title-section__text">Find shortest route</h2>
        </div>
      </div>

      <div className="select-stations">
        <div className="container row">
          <div className="select-stations__col">
            <h3 className="select-stations__text">From</h3>
            <select
              className="select-stations__selector"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            >
              {allStations.map((station, i) => {
                return (
                  <option key={i} value={station}>
                    {station}
                  </option>
                );
              })}
            </select>
            <h3 className="select-stations__selector">Selected: {from}</h3>
          </div>
        </div>
        <div className="container row">
          <div className="select-stations__col">
            <h3 className="select-stations__text">To</h3>
            <select
              className="select-stations__selector"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            >
              {allStations.map((station, i) => {
                return (
                  <option key={i} value={station}>
                    {station}
                  </option>
                );
              })}
            </select>
            <h3 className="select-stations__selector">Selected: {to}</h3>
          </div>
        </div>
        <button className="btn" onClick={() => getPath()}>
          Find Path
        </button>
      </div>

      <div className="result">
        {typeof path === "string" ? (
          <div className="container">
            <div className="result-no-path">
              <p className="result__text">{path}</p>
            </div>
          </div>
        ) : (
          <div className="result__path">
            <p className="result__text">Distance: {path.cost}</p>
            <p>Route:</p>{" "}
            {path.path.map((pathNode, i) => {
              return (
                <div key={i} className="col">
                  <p className="result__path-node">{pathNode}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
