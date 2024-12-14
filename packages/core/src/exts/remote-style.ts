import { Generator } from "../card";
import { Extension } from "../types";

export async function RemoteStyleExtension(generator: Generator): Promise<Extension> {
    const urls = generator.config.sheets;

    const externals: Promise<string>[] = [];
    if (Array.isArray(urls)) {
        externals.push(
            ...urls.map(async (url) => {
                const cahced = await generator.cache?.match(url);
                if (cahced) {
                    return cahced.text();
                }

                const data = await fetch(url)
                    .then(async (res) =>
                        res.ok
                            ? `/* ${url} */ ${await res.text()}`
                            : `/* ${url} ${await res.text()} */`,
                    )
                    .catch((err) => `/* ${url} ${err} */`);

                generator.cache?.put(url, new Response(data));
                return data;
            }),
        );
    }

    return async function RemoteStyle(generator, data, body, styles) {
        for (const css of externals) {
            styles.push(await css);
        }
    };
}
