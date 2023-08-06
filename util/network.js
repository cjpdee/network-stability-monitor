import Ping from "ping.js";
import NetworkSpeed from "network-speed";
import dayjs from "dayjs";

const p = new Ping();
const ns = new NetworkSpeed();

const baseUrl = "https://eu.httpbin.org";
const path = "/stream-bytes/500000";
const fileSizeInByes = 500000;

export const getPing = async () =>
  await p.ping("https://google.com", (err, data) => {
    if (err) {
      console.log("Error occured"); // TODO: handle this error on screen
      return null;
    }
    return data;
  });

export const getUpDown = async () => {
  // const up = await ns.checkUploadSpeed(
  //   {
  //     hostname: baseUrl,
  //     path: path,
  //     headers: {
  //       "Referrer-Policy": "origin-when-cross-origin",
  //     },
  //   },
  //   fileSizeInByes
  // );
  const down = await ns.checkDownloadSpeed(baseUrl + path, fileSizeInByes);

  return {
    // up,
    down,
  };
};
export const getNetworkDatum = async () => {
  const speeds = await getUpDown();
  const ping = await getPing();
  const time = dayjs().format("HH:mm:ss");

  return {
    ...speeds,
    ping: Math.round(ping * 0.5),
    time,
  };
};
