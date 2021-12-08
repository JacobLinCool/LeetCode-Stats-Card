import { handle_request } from "../src/handler";
import makeServiceWorkerEnv from "service-worker-mock";

declare const global: any;

describe("handle", () => {
    beforeEach(() => {
        Object.assign(global, makeServiceWorkerEnv());
        jest.resetModules();
    });

    test("handle path query", async () => {
        const result = await handle_request(new Request("/jacoblincool", { method: "GET" }));
        expect(result.status).toEqual(200);
        const mime = result.headers.get("content-type");
        expect(mime).toEqual("image/svg+xml");
    });

    test("handle query string query", async () => {
        const result = await handle_request(new Request("/?username=jacoblincool", { method: "GET" }));
        expect(result.status).toEqual(200);
        const mime = result.headers.get("content-type");
        expect(mime).toEqual("image/svg+xml");
    });
});
