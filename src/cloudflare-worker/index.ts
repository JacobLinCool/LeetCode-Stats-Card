import { handle } from "./handler";

export default {
    async fetch(
        request: Request,
        environment: unknown,
        context: ExecutionContext,
    ): Promise<Response> {
        try {
            return await handle(request);
        } catch (err) {
            console.error(err);
            return new Response((err as Error).message, {
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
