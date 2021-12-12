import { handle_request } from "./handler";

addEventListener("fetch", (event) => {
    event.respondWith(handle_request(event.request));
});
