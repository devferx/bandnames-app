import { useEffect, useState } from "react";

import { BandAdd } from "./components/BandAdd";
import { BandList } from "./components/BandList";
import { useSocket } from "./hooks/useSocket";

import { Band } from "./interfaces/Band";

function App() {
  const { socket, online } = useSocket("http://localhost:8082");
  const [bands, setBands] = useState<Band[]>([]);

  useEffect(() => {
    socket.on("current-bands", (bands: Band[]) => {
      setBands(bands);
    });
  }, [socket]);

  const voteBand = (id: string) => {
    socket.emit("vote-band", id);
  };

  const createBand = (name: string) => {
    socket.emit("create-band", { name });
  };

  const deleteBand = (id: string) => {
    socket.emit("delete-band", id);
  };

  const updateBandName = (id: string, newName: string) => {
    socket.emit("change-band-name", { id, newName });
  };

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
          <BandList
            data={bands}
            voteBand={voteBand}
            updateBandName={updateBandName}
            deleteBand={deleteBand}
          />
        </div>
        <div className="col-4">
          <BandAdd createBand={createBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
