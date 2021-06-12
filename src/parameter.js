const default_parameters = {
    username: null,
    style: "default",
    animation: true,
    width: 500,
    height: 200,
    border: 1,
    extension: null,
};

function parameters(search) {
    let custom_parameters = {};

    [...search.entries()].forEach((pair) => {
        custom_parameters[pair[0]] = pair[1];
    });

    if (custom_parameters.width !== undefined && Number(custom_parameters.height) < 400) {
        custom_parameters.extension = false;
    }
    if (custom_parameters.extension == "activity" && custom_parameters.height === undefined) {
        custom_parameters.height = 400;
    }

    return Object.assign({}, default_parameters, custom_parameters);
}

export { default_parameters, parameters };
