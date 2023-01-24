import { config } from "dotenv";
config({ path: "src/.env" });

import { PORT } from "./shared/config";
import app from "./server";

(async () => {
    try {
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    } catch (error) {
        console.log("ERROR : ", error);
        process.exit(1);
    }
})();
