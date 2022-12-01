import loglevel from "loglevel";

loglevel.setLevel("INFO");

export const logger = {
  info: loglevel.info,
  warn: loglevel.warn,
  error: loglevel.error,
};

export default logger;
