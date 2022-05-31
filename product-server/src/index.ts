import { config } from "dotenv";
config({ path: "src/.env" });

import { connectMySQL } from "./utils";
import { PORT } from "./constants";
import app from "./server";

(async () => {
    try {
        await connectMySQL();
        console.log("DB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    } catch (error) {
        console.log("ERROR : ", error);
        process.exit(1);
    }
})();
