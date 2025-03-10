import { auth0 } from "../config.js";
import fs from "fs/promises";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    try {
        // Get Auth0 user info from the request headers
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).send("Unauthorized");

        const token = authHeader.split(" ")[1]; // Remove "Bearer "
        const response = await fetch(`https://your-auth0-domain/userinfo`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const user = await response.json();

        // Check if user has the "admin" role
        const userRoles = await fetch(`https://your-auth0-domain/api/v2/users/${user.sub}/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        const roles = await userRoles.json();
        const isAdmin = roles.some(role => role.name === "admin");

        if (!isAdmin) return res.status(403).send("Forbidden: Admins only");

        // Get manga data from request
        const { title, author, description, cover_image } = req.body;

        // Fetch existing manga
        const mangaData = await fs.readFile("../db/manga.json", "utf-8");
        let mangaList = JSON.parse(mangaData);

        // Add new manga
        const newManga = {
            id: mangaList.length + 1,
            title,
            author,
            description,
            cover_image,
            chapters: []
        };
        mangaList.push(newManga);

        // Save updated manga list
        await fs.writeFile("../db/manga.json", JSON.stringify(mangaList, null, 2));

        res.status(200).json({ message: "Manga added successfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}
