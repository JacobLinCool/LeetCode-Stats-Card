import { handle_request } from "./handler";

export default {
    async fetch(
        request: Request,
        environment: unknown,
        context: ExecutionContext,
    ): Promise<Response> {
        try {
            // return new Response("");
            return handle_request(request);
        } catch (err) {
            console.error(err);
            return new Response((<Error>err).message, {
                status: 500,
                headers: { "Content-Type": "text/plain" },
            });
        }
    },
    async scheduled(
        controller: ScheduledController,
        environment: unknown,
        context: ExecutionContext,
    ): Promise<void> {
        // await dosomething();
    },
};
