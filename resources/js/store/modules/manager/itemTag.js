function dotToTag(payload) {
    //console.log('dotToTag() payload: ' + JSON.stringify(payload, null, 2));
    switch (payload.module) {
        case "Area":
        case "Season":
        case "AreaSeason":
        case "Locus":
            return payload.dot.replaceAll('.', '/');
            break;

        case "Stone":
        case "Lithic":
        case "Glass":
        case "Metal":
        case "Pottery":
        case "Flora":
        case "Fauna":
        case "Tbd":

            let pieces = payload.dot.split('.');
            return pieces.slice(0, 3).join('/') + '.' + pieces.slice(3).join('.');

    }
}
function exampleTwo() { }

export {
    dotToTag,
    exampleTwo,
}