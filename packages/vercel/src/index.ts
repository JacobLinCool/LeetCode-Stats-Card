import { handleRequest } from "./handler";
import Header from "./headers";

export const config = {
    runtime: "edge",
};

export default async function handler(request: Request): Promise<Response> {
    try {
        return await handleRequest(request);
    } catch (err) {
        console.error(err);
        return new Response((err as Error).message, {
            status: 500,
            headers: new Header().add("cors", "text"),
        });
    }
}
