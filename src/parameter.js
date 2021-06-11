const default_parameters = {
    username: null,
    style: "default",
    top: "4,icon,4,username|4,rank,4",
    body: "total,detail",
};

function parameters(search) {
    let custom_parameters = {};

    [...search.entries()].forEach((pair) => {
        custom_parameters[pair[0]] = pair[1];
    });

    return Object.assign({}, default_parameters, custom_parameters);
}

export { default_parameters, parameters };
