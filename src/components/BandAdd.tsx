import { useContext, useState } from "react";
import type { FormEvent } from "react";

import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const [value, setValue] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim().length <= 0) return;

    socket.emit("create-band", { name: value });
    setValue("");
  };

  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          className="form-control"
          type="text"
          placeholder="Nuevo nombre de banda"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
        />
      </form>
    </>
  );
};
