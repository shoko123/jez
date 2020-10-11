export default {

    mediaPerPage: 18,
    chipsPerPage: 100,
    
    myModules: {
        AreaSeason: {
            module: "areaSeason",
            itemName: "AreaSeason",
            collectionName: "areas/seasons",
            storeModuleName: "arsn",
            appBaseUrl: "/areas-seasons",
            apiBaseUrl: "/api/areas-seasons",
            displayOptions: ["Main", "Gallery"],
        },

        Locus: {
            module: "loci",
            itemName: "Locus",
            collectionName: "loci",
            storeModuleName: "loci",
            appBaseUrl: "/loci",
            apiBaseUrl: "/api/loci",
            isDigModule: true,

            isFind: false,
            displayOptions: ["Main", "Locus Gallery", "Finds Gallery", "All",],
        },
        Pottery: {
            module: "pottery",
            itemName: "Pottery",
            collectionName: "pottery",
            storeModuleName: "pot",
            appBaseUrl: "/finds/pottery",
            apiBaseUrl: "/api/pottery",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "4-panel", "Gallery"],
            registrationOptions:
                ["PT", "AR"],
        },
        Stone: {
            module: "stones",
            itemName: "Stone",
            collectionName: "stones",
            storeModuleName: "stones",
            appBaseUrl: "/finds/stones",
            apiBaseUrl: "/api/stones",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "4-panel", "Gallery"],
            registrationOptions:
                ["GS", "AR"],
        },
        Glass: {
            module: "Glass",
            itemName: "Glass",
            collectionName: "Glass",
            storeModuleName: "glass",
            appBaseUrl: "/finds/glass",
            apiBaseUrl: "/api/glass",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "4-panel", "Gallery"],
            registrationOptions:
                ["AR",],
        },
        Lithic: {
            module: "Lithic",
            itemName: "Lithic",
            collectionName: "lithics",
            storeModuleName: "lith",
            appBaseUrl: "/finds/lithics",
            apiBaseUrl: "/api/lithics",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "4-panel", "Gallery"],
            registrationOptions:
                ["FL", "AR",],
        },
        Metal: {
            module: "Metal",
            itemName: "Metal",
            collectionName: "metals",
            storeModuleName: "mtl",
            appBaseUrl: "/finds/metals",
            apiBaseUrl: "/api/metals",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "4-panel", "Gallery"],
            registrationOptions:
                ["AR",],
        },
        Auth: {
            module: "auth",
            itemName: null,
            collectionName: null,
            storeModuleName: "aut",
            appBaseUrl: "/auth",
            apiBaseUrl: null,
            isDigModule: false,

            isFind: false
        },
    }
}