import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { Band } from "../interfaces/Band";

interface BandListProps {
  data: Band[];
  voteBand: (id: string) => void;
}

export const BandList = ({ data, voteBand }: BandListProps) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const cambioNombre = (
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

  const onFocus = (id: string, name: string) => {
    console.log("onFocus");
    // TODO: Disparar el evento de sockets
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
            onChange={(event) => cambioNombre(event, band.id)}
            onBlur={() => onFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger">Borrar</button>
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
