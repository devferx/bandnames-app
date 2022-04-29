import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Band } from "../interfaces/Band";

interface BandListProps {
  data: Band[];
  voteBand: (id: string) => void;
  updateBandName: (id: string, newName: string) => void;
  deleteBand: (id: string) => void;
}

export const BandList = ({
  data,
  voteBand,
  updateBandName,
  deleteBand,
}: BandListProps) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const changeBandName = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    const newName = event.target.value;

    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onBlur = (id: string, name: string) => {
    updateBandName(id, name);
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => voteBand(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            type="text"
            value={band.name}
            onChange={(event) => changeBandName(event, band.id)}
            onBlur={(event) => onBlur(band.id, event.target.value)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteBand(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </>
  );
};
