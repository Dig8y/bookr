import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";

import * as schema from "./schema/index";

config({ path: ".env" }); // or .env.local

// !!! CHANGE THIS

const sql = neon(
  "postgresql://bookr_owner:Qi4CNjWp1qAR@ep-curly-meadow-a2troqzm.eu-central-1.aws.neon.tech/bookr?sslmode=require",
);
export const db = drizzle(sql, { schema });
