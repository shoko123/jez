export function filtersToQueryParams(localFilters) {
    let areas = "";
    let seasons = "";
    let media = "";
    let scopes = "";
    let registration_categories = "";
    let tags = "";
    let moduleTags = "";
    let lookups = [];

    localFilters.forEach((group => {
        switch (group.group_type) {
            case "Registration":
                switch (group.name) {
                    case "Areas":
                        group.params.forEach(x => {
                            areas += x.name + ",";
                        })
                        break;
                    case "Seasons":
                        group.params.forEach(x => {
                            seasons += (parseInt(x.name, 10) - 2000) + ",";
                        })
                        //seasons += parseInt(group.params.name, 10) - 2000 + ",";
                        break;
                    case "Media":
                        group.params.forEach(x => {
                            media += x.name + ",";
                        })

                        break;
                    case "registration_categories":
                        group.params.forEach(x => {
                            registration_categories += x.name + ",";
                        })
                        //registration_categories += group.params.name + ",";
                        break;
                    case "scopes":
                        group.params.forEach(x => {
                            scopes += x.id + ",";
                        })
                        //scopes += group.params.id + ",";
                        break;
                }
                break;
            case "Lookup":
                //format to objects with column_name and id array.
                let ids = "";
                group.params.forEach(x => {
                    ids += x.id + ",";
                })
                lookups.push({ column_name: group.column_name, ids: ids });
                break;
            case "Tag":
                //format tagParams according to Spatie interface (types with tags).
                group.params.forEach(x => {
                    if (group.isGlobalTag) {
                        tags += x.id + ",";
                    } else {
                        moduleTags += x.id + ",";
                    }
                })
                break;
        }

    }));
    let qs = {};
    if (areas.length > 0) {
        qs["R>areas"] = areas.substring(0, areas.length - 1);
    }
    if (seasons.length > 0) {
        qs["R>seasons"] = seasons.substring(0, seasons.length - 1);
    }
    if (registration_categories.length > 0) {
        qs["R>registration_categories"] = registration_categories.substring(0, registration_categories.length - 1);
    }
    if (scopes.length > 0) {
        qs["R>scopes"] = scopes.substring(0, scopes.length - 1);
    }
    if (media.length > 0) {
        qs["R>media"] = media.substring(0, media.length - 1);
    }
    if (tags.length > 0) {
        qs["T>globals"] = tags.substring(0, tags.length - 1);
    }
    if (moduleTags.length > 0) {
        qs["T>module"] = moduleTags.substring(0, moduleTags.length - 1);
    }
    if (lookups.length > 0) {
        lookups.forEach(x => {
            qs["L>" + x.column_name] = x.ids.substring(0, x.ids.length - 1);
        });
    }
    return qs
}

export function filtersFromQueryString(qs) {

    function idsStringToArray(catCode, prop, idsString) {

        function asString(catCode, prop) {
            switch (catCode) {
                case "R":
                    switch (prop) {
                        case "areas":
                        case "media":
                        case "registration_categories":
                        case "scopes":
                            return true;
                        case "seasons":
                        case "tags":
                            return false;
                        default:
                            console.log(`BAD Registration: ${prop}`);//(groups) ${JSON.stringify(payload, null, 2)}`);
                            return true
                    }

                case "L":
                case "T":
                case "M":
                    return false;
                default:
                    console.log(`aux/filtersFromQueryString BAD group: ${prop}`);//(groups) ${JSON.stringify(payload, null, 2)}`);
                    return true
            }
        }

        let ids = idsString.split(',');
        let idsArray = [];
        ids.forEach(x => {
            if (asString(catCode, prop)) {
                idsArray.push(x);
            } else {
                idsArray.push(parseInt(x, 10));
            }
        });
        return idsArray;
    }

    //code run starts here.
    //console.log(`filtersFromQueryString: ${JSON.stringify(qs, null, 2)}`)
    let xhrParams = {};
    let localParams = [];
    //iterate thru queryString, add properties to xhrParams and push ids 
    for (const prop in qs) {

        let idsString = qs[prop];
        let catCode = prop.substring(0, 1);
        let name = prop.slice(2);

        let cat;
        switch (catCode) {
            case "T":
            case "M":
                cat = "tags";
                break;
            case "R":
                cat = "registration";
                break;
            case "L":
                cat = "lookups";
                break;
            default:
                console.log(`parse qs BAD cat: ${cat} idsString: ${idsString} name: ${name}`);
        }
        //console.log(`[${prop}]: ${idsString} cat: ${cat} catCode: ${catCode} name: ${name}`);
        let filtersArray = idsStringToArray(catCode, name, idsString);
        //localParams
        //console.log(`filtersArray:  ${JSON.stringify(filtersArray, null, 2)}`);

        filtersArray.forEach(x => {
            switch (catCode) {
                case "T":
                    switch (name) {
                        case "globals":
                            localParams.push("T>" + x);
                            break;
                        case "module":
                            localParams.push("M>" + x);
                            break;
                        default:
                            alert(`wrong name: ${name}`);
                            break;
                    }
                    break;
                case "R":
                    switch (name) {
                        case "areas":
                            localParams.push(catCode + ">Areas>" + x);
                            break;
                        case "seasons":
                            localParams.push(catCode + ">Seasons>" + (parseInt(x, 10) + 2000).toString());
                            break;
                        case "media":
                            localParams.push(catCode + ">Media>" + x);
                            break;
                        case "registration_categories":
                            localParams.push(catCode + ">" + name + ">" + x);
                            break;
                        case "scopes":
                            localParams.push(catCode + ">" + name + ">" + x.charAt(0).toUpperCase() + x.slice(1));
                            break;
                    }
                    break;
                case "L":
                    localParams.push(catCode + ">" + name + ">" + x);
                    break;
            }
        })

        //xhrParams
        if (xhrParams.hasOwnProperty(cat)) {
            //if (xhrParams[cat].hasOwnProperty(name)) {
            xhrParams[cat][name] = idsStringToArray(catCode, name, idsString);
            //} else {
            //    xhrParams[cat][name] = idsStringToArray(catCode, name, idsString);
            //}
        } else {
            xhrParams[cat] = { [name]: idsStringToArray(catCode, name, idsString) };
                  }
    }
    return { xhr: xhrParams, local: localParams };
}
