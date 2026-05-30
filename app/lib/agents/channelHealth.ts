import fs from "fs";
import path from "path";

export interface ChannelHealth {
  monetized: boolean;
  subscribers: number;
  watchHours: number;
  shortsViews: number;

  copyrightClaims: number;
  copyrightStrikes: number;
  communityStrikes: number;

  revenue: number;

  healthScore: number;
  status: string;

  warnings: string[];
}

const DATA_PATH = path.join(
  process.cwd(),
  "lib",
  "memory",
  "channelHealth.json"
);

export async function getChannelHealth(): Promise<ChannelHealth> {
  try {
    const memoryDir = path.dirname(DATA_PATH);

    if (!fs.existsSync(memoryDir)) {
      fs.mkdirSync(memoryDir, { recursive: true });
    }

    if (!fs.existsSync(DATA_PATH)) {
      const defaultData: ChannelHealth = {
        monetized: false,
        subscribers: 0,
        watchHours: 0,
        shortsViews: 0,

        copyrightClaims: 0,
        copyrightStrikes: 0,
        communityStrikes: 0,

        revenue: 0,

        healthScore: 100,
        status: "Excellent",

        warnings: [],
      };

      fs.writeFileSync(
        DATA_PATH,
        JSON.stringify(defaultData, null, 2)
      );

      return defaultData;
    }

    const data: ChannelHealth = JSON.parse(
      fs.readFileSync(DATA_PATH, "utf8")
    );

    let score = 100;
    const warnings: string[] = [];

    score -= (data.copyrightClaims || 0) * 5;
    score -= (data.copyrightStrikes || 0) * 25;
    score -= (data.communityStrikes || 0) * 30;

    if (score < 0) score = 0;

    if (data.copyrightClaims > 0) {
      warnings.push(
        `${data.copyrightClaims} copyright claim(s) detected`
      );
    }

    if (data.copyrightStrikes > 0) {
      warnings.push(
        `${data.copyrightStrikes} copyright strike(s) detected`
      );
    }

    if (data.communityStrikes > 0) {
      warnings.push(
        `${data.communityStrikes} community guideline strike(s) detected`
      );
    }

    let status = "Excellent";

    if (score < 90) status = "Good";
    if (score < 70) status = "Warning";
    if (score < 50) status = "Critical";

    return {
      ...data,
      healthScore: score,
      status,
      warnings,
    };
  } catch (error) {
    console.error("CHANNEL HEALTH ERROR:", error);

    return {
      monetized: false,
      subscribers: 0,
      watchHours: 0,
      shortsViews: 0,

      copyrightClaims: 0,
      copyrightStrikes: 0,
      communityStrikes: 0,

      revenue: 0,

      healthScore: 0,
      status: "Error",

      warnings: ["Failed to load channel health"],
    };
  }
}

export const ChannelHealthAgent = getChannelHealth;
