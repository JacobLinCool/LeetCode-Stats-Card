import { handle } from "./handler";
import Header from "./headers";

export default {
    async fetch(request: Request): Promise<Response> {
        try {
            return await handle(request);
        } catch (err) {
            console.error(err);
            return new Response((err as Error).message, {
                status: 500,
                headers: new Header().add("cors", "text"),
            });
        }
    },
};
