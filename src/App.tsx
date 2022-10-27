import "./App.css";
import { FileUploader } from "react-drag-drop-files";
import * as d3 from "d3";
import { useEffect, useState } from "react";
import { DSVRowArray } from "d3";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const fileTypes = ["CSV"];

function App() {
  const [data, setData] = useState<DSVRowArray<string> | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [x, setX] = useState<string | null>(null);
  const [y, setY] = useState<string | null>(null);

  const handleChange = async (file: File) => {
    setFile(file);
    setData(d3.csvParse(await file.text()));
  };

  useEffect(() => {}, [data]);

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: y || "",
        },
      },
      x: {
        title: {
          display: true,
          text: x || "",
        },
      },
    },
  };

  return (
    <div className="App">
      <header className="App-header"></header>
      <h1>EasyChart</h1>
      <h3>Drag and drop CSV File to visualise your data</h3>
      <FileUploader handleChange={handleChange} types={fileTypes} />
      <div style={{ display: "flex" }}>
        <div style={{ borderColor: "#000", borderWidth: 1 }}>
          <p>Choose variable for X axis</p>
          {data?.columns.map((colName) => {
            return <button onClick={() => setX(colName)}>{colName}</button>;
          })}
        </div>
        <div style={{ borderColor: "#000", borderWidth: 1 }}>
          <p>Choose variable for Y axis</p>
          {data?.columns.map((colName) => {
            return <button onClick={() => setY(colName)}>{colName}</button>;
          })}
        </div>
      </div>
      <Scatter
        style={{ maxWidth: 700, maxHeight: 700 }}
        options={options}
        data={{
          datasets: [
            {
              label: file ? file.name : "A dataset",
              data: data?.map((row) => ({
                x: row[x || 0],
                y: row[y || 0],
              })),
              backgroundColor: `#${Math.floor(
                Math.random() * 16777215
              ).toString(16)}`,
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
