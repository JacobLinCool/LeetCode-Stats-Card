import leetcode_card from "../../core";

export const onRequest: PagesFunction = async function ({ request, params }) {
    const query = [...new URLSearchParams(request.url.split("?")[1]).entries()].reduce((acc: { [key: string]: unknown }, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
    query.username = params.username;

    const svg = await leetcode_card(query);

    return new Response(svg, {
        headers: {
            "Content-Type": "image/svg+xml",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
        },
    });
};
