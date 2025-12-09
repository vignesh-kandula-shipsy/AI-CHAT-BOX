import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function googleSearch(query) {
    const apiKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.GOOGLE_SEARCH_ENGINE_ID;

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        query
    )}&key=${apiKey}&cx=${cx}`;

    const { data } = await axios.get(url);

    return data.items?.slice(0, 5).map(item => ({
        title: item.title,
        snippet: item.snippet,
        link: item.link
    })) || [];
}
