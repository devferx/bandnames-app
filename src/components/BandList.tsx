import { useContext, useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { SocketContext } from "../context/SocketContext";
import { Band } from "../interfaces/Band";

export const BandList = () => {
  const [bands, setBands] = useState<Band[]>([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands: Band[]) => {
      setBands(bands);
    });

    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

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

  const voteBand = (id: string) => {
    socket.emit("vote-band", id);
  };

  const onBlur = (id: string, newName: string) => {
    socket.emit("change-band-name", { id, newName });
  };

  const deleteBand = (id: string) => {
    socket.emit("delete-band", id);
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
