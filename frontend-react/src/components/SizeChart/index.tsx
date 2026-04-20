import React, { useState, useEffect } from "react";

interface Props {
  error?: string;
  initialMeasurements?: number[][];
  rowLabels: string[];
  columnLabels: string[];
  onChange?: (measurements: number[][]) => void;
}

export const SizeChart: React.FC<Props> = ({
  error,
  rowLabels,
  columnLabels,
  initialMeasurements,
  onChange,
}) => {
  const [measurements, setMeasurements] = useState<number[][]>(() => {
    if (!initialMeasurements || initialMeasurements.length === 0) {
      // Initialize measurements based on rows and columns if initialMeasurements is not provided
      const newMeasurements: number[][] = [];
      for (let i = 0; i < rowLabels.length; i++) {
        const newRow: number[] = new Array(columnLabels.length).fill(0);
        newMeasurements.push(newRow);
      }
      return newMeasurements;
    } else {
      // Fill in initial measurements, ensuring the table has the correct size
      const newMeasurements: number[][] = [];
      for (let i = 0; i < rowLabels.length; i++) {
        if (i < initialMeasurements.length) {
          const newRow: number[] = [];
          for (let j = 0; j < columnLabels.length; j++) {
            if (j < initialMeasurements[i].length) {
              newRow.push(initialMeasurements[i][j]);
            } else {
              newRow.push(0);
            }
          }
          newMeasurements.push(newRow);
        } else {
          const newRow: number[] = new Array(columnLabels.length).fill(0);
          newMeasurements.push(newRow);
        }
      }
      return newMeasurements;
    }
  });

  const handleCellChange = (
    rowIndex: number,
    colIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedMeasurements = measurements.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) =>
            cIndex === colIndex ? parseFloat(event.target.value) || 0 : cell
          )
        : row
    );
    setMeasurements(updatedMeasurements);
    if (onChange) {
      onChange(updatedMeasurements);
    }
  };

  useEffect(() => {
    // Handle updates if the row or column labels change
    setMeasurements((prevMeasurements) => {
      const updatedMeasurements: number[][] = [];
      for (let i = 0; i < rowLabels.length; i++) {
        if (i < prevMeasurements.length) {
          const newRow: number[] = [];
          for (let j = 0; j < columnLabels.length; j++) {
            if (j < prevMeasurements[i].length) {
              newRow.push(prevMeasurements[i][j]);
            } else {
              newRow.push(0);
            }
          }
          updatedMeasurements.push(newRow);
        } else {
          const newRow: number[] = new Array(columnLabels.length).fill(0);
          updatedMeasurements.push(newRow);
        }
      }
      return updatedMeasurements;
    });
  }, [rowLabels, columnLabels]);

  return (
    <div className={`mb-6 ${error ? "mb-8" : ""} overflow-x-auto max-w-full`}>
      <div className="max-h-44 overflow-y-auto">
        <table className="table-auto bg-light min-w-max">
        <thead>
          <tr className="bg-darker">
            <th className="border px-4 py-2 text-light border-deepblue">{"Unit"}</th>
            {columnLabels.map((label, index) => (
              <th key={index} className="border px-4 py-2 text-light border-deepblue">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {measurements.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border p-2 bg-lightpurple text-deepblue uppercase">{rowLabels[rowIndex]}</td>
              {row.map((cell, colIndex) => (
                <td key={colIndex} className="border p-2">
                  <input
                    min={0}
                    type="number"
                    value={cell}
                    onChange={(event) => handleCellChange(rowIndex, colIndex, event)}
                    className="w-10 h-5"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
       </div>
      {error && <p className="text-red-500 text-sm mt-1 ">{error}</p>}
    </div>
  );
};

export default SizeChart;
