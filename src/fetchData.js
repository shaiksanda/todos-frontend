// src/fetchData.js
import { toast } from "react-toastify";

let interval;

export const stagedTimers = {
  start: () => {
    let elapsed = 0;
    interval = setInterval(() => {
      elapsed += 8;

      if (elapsed === 8) toast.info("Waking up the server…");
      if (elapsed === 16) toast.info("Server is processing your request…");
      if (elapsed === 24) toast.info("Still working, hang tight…");
      if (elapsed >= 32) {
        toast.error("Server not responding. Please try again later.");
        clearInterval(interval);
      }
    }, 8000);
  },
  stop: () => {
    clearInterval(interval);
  },
};
