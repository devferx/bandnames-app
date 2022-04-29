import { useContext, useEffect, useState } from "react";

import { BandAdd } from "../components/BandAdd";
import { BandList } from "../components/BandList";
import { SocketContext } from "../context/SocketContext";
import { useSocket } from "../hooks/useSocket";

import { Band } from "../interfaces/Band";

export const HomePage = () => {
  const { online } = useContext(SocketContext);

  // const createBand = (name: string) => {
  //   socket.emit("create-band", { name });
  // };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status :{" "}
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">{/* <BandAdd createBand={createBand} /> */}</div>
      </div>
    </div>
  );
};
