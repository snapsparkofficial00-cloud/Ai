import os from "os";

export function getSystemMonitor() {

  return {

    platform:
      os.platform(),

    cpuCores:
      os.cpus().length,

    totalMemory:
      os.totalmem(),

    freeMemory:
      os.freemem(),

    uptime:
      os.uptime(),

    loadAverage:
      os.loadavg(),

    timestamp:
      new Date(),

  };

}
