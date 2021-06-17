const default_parameters = {
    username: null,
    style: "default",
    animation: true,
    width: 500,
    height: 200,
    border: 1,
    border_radius: 4,
    font: null,
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

    if (custom_parameters.width !== undefined) {
        custom_parameters.width = Number(custom_parameters.width);
    }
    if (custom_parameters.height !== undefined) {
        custom_parameters.height = Number(custom_parameters.height);
    }
    if (custom_parameters.style !== undefined) {
        custom_parameters.style = custom_parameters.style.toLowerCase();
    }
    if (custom_parameters.animation !== undefined) {
        if (custom_parameters.animation === "false" || custom_parameters.animation === "0") custom_parameters.animation = false;
        custom_parameters.animation = !!custom_parameters.animation;
    }

    console.log("Custom Parameters", custom_parameters);

    return Object.assign({}, default_parameters, custom_parameters);
}

export { default_parameters, parameters };
