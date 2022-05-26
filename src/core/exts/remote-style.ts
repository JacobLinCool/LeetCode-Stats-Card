import { Generator } from "../card";
import { Extension } from "../types";

export function RemoteStyleExtension(generator: Generator): Extension {
    const urls = generator.config.sheets;

    const externals: Promise<string>[] = [];
    if (Array.isArray(urls)) {
        externals.push(
            ...urls.map(async (url) => {
                const cahced = await generator.cache.get(url);
                if (cahced) {
                    return cahced;
                }

                const data = await fetch(url)
                    .then(async (res) =>
                        res.ok
                            ? `/* ${url} */ ${await res.text()}`
                            : `/* ${url} ${await res.text()} */`,
                    )
                    .catch((err) => `/* ${url} ${err} */`);

                generator.cache.put(url, data);
                return data;
            }),
        );
    }

    return async (generator, data, body, styles) => {
        for (const css of externals) {
            styles.push(await css);
        }
    };
}
