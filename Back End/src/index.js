import DataBase_Connection from "./DataBase/index.js";
import app from "./app.js";
import { PORT } from "./constants.js";

// Start database connection
DataBase_Connection()
    .then(() => {
        // Handle server errors
        app.on("error", (error) => {
            console.error(`❌ App Error: ${error.message}`);
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Database Connection Failed:", err.message);
    });
