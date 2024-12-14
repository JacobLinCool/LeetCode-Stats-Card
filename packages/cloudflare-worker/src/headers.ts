const source = {
    cors: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Credentials": "true",
    },
    json: {
        "Content-Type": "application/json",
    },
    html: {
        "Content-Type": "text/html",
    },
    text: {
        "Content-Type": "text/plain",
    },
    svg: {
        "Content-Type": "image/svg+xml",
    },
};

export default class Header extends Headers {
    constructor(headers?: Headers) {
        super(headers);
    }

    add(...types: (keyof typeof source)[]): Headers {
        for (const type of types) {
            for (const [key, value] of Object.entries(source[type])) {
                this.set(key, value);
            }
        }

        return this;
    }
}
