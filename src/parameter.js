const default_parameters = {
    username: null,
    style: "default",
    animation: true,
    width: 500,
    height: 200,
};

function parameters(search) {
    let custom_parameters = {};

    [...search.entries()].forEach((pair) => {
        custom_parameters[pair[0]] = pair[1];
    });

    return Object.assign({}, default_parameters, custom_parameters);
}

export { default_parameters, parameters };
