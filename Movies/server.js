import cors from "cors";
import express from "express";
import reviews from "./api/reviews.route.js"; // Ensure the path is correct

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/reviews", reviews);

app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
