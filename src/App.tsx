import { useRef } from "react";
import Grid from "./components/Grid";
import { PathFindingProvider } from "./context/PathFindingContext";
import { SpeedProvider } from "./context/SpeedContext";
import { TileProvider } from "./context/TileContext";
import Nav from "./components/Nav";

export default function App() {
  const isValuelizationRunningRef = useRef(false);
  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider>
          <div className="h-screen w-screen flex flex-col">
            <Nav />
            <Grid isValuelizationRunningRef={isValuelizationRunningRef} />
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathFindingProvider>
  );
}
