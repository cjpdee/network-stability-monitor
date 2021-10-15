import Head from "next/head";
import { useState, useReducer } from "react";
import { Range } from "react-range";
import Graph from "../components/Graph";

/**
 * TODOs / Nice to have
 * - start/stop button
 * - drag left and right
 * - status window - ping, up, down
 * - select data - ping/down/up
 * - (if up/down) select format
 * - hover mouse over graph for exact measure
 * - tips on how to improve internet connection/stability
 */

const buttonStyle =
  "p-2 border-2 border-white hover:bg-white hover:text-black ";
const buttonActiveStyle = "bg-green-600 hover:bg-green-600 hover:text-white";
export const labelClass =
  "flex justify-between border-b border-outline items-center block text-xl last:border-b-0";
export const textboxClass = "w-1/2 bg-background border-outline p-3 text-xl";

const reducer = (state, action) => {
  return [...state, action.payload];
};

export default function Home() {
  const [dataType, setDataType] = useState("ping");
  const [format, setFormat] = useState("mbps");
  const [networkData, dispatch] = useReducer(reducer, []); // move to main component

  return (
    <div className="min-h-screen max-h-screen w-full overflow-hidden bg-black">
      <Head>
        <title>Network Stability Monitor</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Network stability monitor, online free "
        />
      </Head>

      <main className="max-h-screen h-screen w-auto flex">
        <nav
          className="w-full max-w-xs h-screen text-white p-4 border-r-2 border-white
          flex flex-col justify-between
        "
        >
          <div className="">
            <h1 className=" text-3xl mb-4">Network Stability Monitor</h1>
            <div className="mb-4">
              <label className={labelClass}>
                Ping
                <input
                  disabled
                  value={
                    networkData.length &&
                    networkData[networkData.length - 1].ping
                  }
                  className={textboxClass + " text-danger"}
                  type="number"
                  name="change"
                />
              </label>
              <label className={labelClass}>
                Download
                <input
                  disabled
                  value={
                    networkData.length &&
                    networkData[networkData.length - 1].down[format] + format
                  }
                  className={textboxClass + " text-danger"}
                  type="text"
                  name="change"
                />
              </label>
              <label className={labelClass}>
                Upload
                <input
                  disabled
                  value={
                    networkData.length &&
                    networkData[networkData.length - 1].up[format] + format
                  }
                  className={textboxClass + " text-danger"}
                  type="text"
                  name="change"
                />
              </label>
            </div>
            <h2 className="text-xl mb-2">Chart data</h2>
            <div className="flex mb-4">
              <button
                className={
                  buttonStyle +
                  "w-1/3 mr-2 last:mr-0 " +
                  (dataType === "ping" ? buttonActiveStyle : "")
                }
                onClick={(e) => {
                  setDataType("ping");
                }}
              >
                Ping
              </button>
              <button
                className={
                  buttonStyle +
                  "w-1/3 mr-2 last:mr-0 " +
                  (dataType === "down" ? buttonActiveStyle : "")
                }
                onClick={(e) => {
                  setDataType("down");
                }}
              >
                Download
              </button>
              <button
                className={
                  buttonStyle +
                  "w-1/3 mr-2 last:mr-0 " +
                  (dataType === "up" ? buttonActiveStyle : "")
                }
                onClick={(e) => {
                  setDataType("up");
                }}
              >
                Upload
              </button>
            </div>
            <h2 className="text-xl mb-2">Up/Down format</h2>
            <div className="flex mb-4">
              <button
                className={
                  buttonStyle +
                  "w-1/3 mr-2 last:mr-0 " +
                  (format === "mbps" ? buttonActiveStyle : "")
                }
                onClick={(e) => {
                  setFormat("mbps");
                }}
              >
                mbps
              </button>

              <button
                className={
                  buttonStyle +
                  "w-1/3 mr-2 last:mr-0 " +
                  (format === "kbps" ? buttonActiveStyle : "")
                }
                onClick={(e) => {
                  setFormat("kbps");
                }}
              >
                kbps
              </button>

              <button
                className={
                  buttonStyle +
                  "w-1/3 mr-2 last:mr-0 " +
                  (format === "bps" ? buttonActiveStyle : "")
                }
                onClick={(e) => {
                  setFormat("bps");
                }}
              >
                bps
              </button>
            </div>
          </div>
          <div className="">
            <button className={buttonStyle + " w-full"}>
              How to improve wifi stability
            </button>
          </div>
        </nav>
        <div className="w-full h-full overflow-x-auto">
          <div className="w-full ">
            <Graph
              dataType={dataType}
              format={format}
              networkData={networkData}
              dispatch={dispatch}
            />
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}
