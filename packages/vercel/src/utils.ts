export function normalize(str: string): string {
    return str.toLowerCase().split(/[ _]+/g).join("_");
}

export function booleanize(value: string | boolean): boolean {
    if (typeof value === "boolean") return value;

    const F = [
        "false",
        "null",
        "0",
        "undefined",
        "no",
        "none",
        "off",
        "disable",
        "disabled",
        "nan",
        "",
    ];
    return !F.includes(value.toLowerCase());
}
