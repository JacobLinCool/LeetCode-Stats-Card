function cors_header(header) {
    header.set("Access-Control-Allow-Origin", "*");
    header.set("Access-Control-Allow-Credentials", true);
    return header;
}

export { cors_header };
