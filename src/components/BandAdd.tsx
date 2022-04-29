import { useState } from "react";
import type { FormEvent } from "react";

interface BandAddProps {
  createBand: (name: string) => void;
}

export const BandAdd = ({ createBand }: BandAddProps) => {
  const [value, setValue] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (value.trim().length <= 0) return;

    createBand(value);
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
