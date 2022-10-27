import './App.css';
import { FileUploader } from "react-drag-drop-files";
import * as d3 from "d3"
import { useEffect, useState } from 'react';
import { DSVRowArray } from 'd3';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const fileTypes = ["CSV"];

function App() {

  const [data, setData] = useState<DSVRowArray<string> | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [x, setX] = useState<string | null>(null)
  const [y, setY] = useState<string | null>(null)

  const handleChange = async (file: File) => {
    console.log("File:")
    setFile(file)
    setData(d3.csvParse(await file.text()))
  }

  useEffect(() => {

  }, [data])

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: y || ""
        }
      },
      x: {
        title: {
          display: true,
          text: x || ""
        }
      }
    },
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <FileUploader handleChange={handleChange} types={fileTypes} />
      <p>X axis</p>
      {data?.columns.map((colName) => {
    return (
      <button onClick={() => setX(colName)}>{colName}</button>
    )
  })}
    <p>Y axis</p>
        {data?.columns.map((colName) => {
    return (
      <button onClick={() => setY(colName)}>{colName}</button>
    )
  })}
      <Scatter style={{ maxWidth: 700, maxHeight: 700}} options={options} data={{datasets: [
    {
      label: file ? file.name :'A dataset',
      data: data?.map((row) => ({
        x: row[x || 0],
        y: row[y || 0],
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ]}} />
    </div>
  );
}

export default App;
