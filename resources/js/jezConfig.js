export default {

    mediaPerPage: 18,
    chipsPerPage: 100,
    
    myModules: {
        Auth: {
            storeModuleName: "aut",
            appBaseUrl: "/auth",
            apiBaseUrl: null,
            isDigModule: false,

            isFind: false
        },     
        About: {          
            storeModuleName: "about",
            collectionName: "About",
            appBaseUrl: "/about",
            apiBaseUrl: "/api/about",
        },
        Area: {
            module: "area",
            itemName: "Area",
            collectionName: "Areas",
            storeModuleName: "area",
            appBaseUrl: "/dig-modules/areas",
            apiBaseUrl: "/api/areas",
            displayOptions: ["Main", "Gallery"],
        },
        Season: {
            module: "Season",
            itemName: "Season",
            collectionName: "Seasons",
            storeModuleName: "season",
            appBaseUrl: "/dig-modules/seasons",
            apiBaseUrl: "/api/seasons",
            displayOptions: ["Main", "Gallery"],
        },
        AreaSeason: {
            module: "areaSeason",
            itemName: "AreaSeason",
            collectionName: "Areas/Seasons",
            storeModuleName: "arsn",
            appBaseUrl: "/dig-modules/areas-seasons",
            apiBaseUrl: "/api/areas-seasons",
            displayOptions: ["Main", "Gallery", "Loci Gallery"],
        },

        Locus: {
            module: "loci",
            itemName: "Locus",
            collectionName: "Loci",
            storeModuleName: "loci",
            appBaseUrl: "/dig-modules/loci",
            apiBaseUrl: "/api/loci",
            isDigModule: true,

            isFind: false,
            displayOptions: ["Main", "Locus Gallery", "Finds Gallery"],
        },
        Pottery: {
            module: "pottery",
            itemName: "Pottery",
            collectionName: "Pottery",
            storeModuleName: "pot",
            appBaseUrl: "/dig-modules/pottery",
            apiBaseUrl: "/api/pottery",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["PT", "AR"],
        },
        Stone: {
            module: "stones",
            itemName: "Stone",
            collectionName: "Stones",
            storeModuleName: "stones",
            appBaseUrl: "/dig-modules/stones",
            apiBaseUrl: "/api/stones",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["GS", "AR"],
        },
        Glass: {
            module: "Glass",
            itemName: "Glass",
            collectionName: "Glass",
            storeModuleName: "glass",
            appBaseUrl: "/dig-modules/glass",
            apiBaseUrl: "/api/glass",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["AR",],
        },
        Lithic: {
            module: "Lithic",
            itemName: "Lithic",
            collectionName: "Lithics",
            storeModuleName: "lith",
            appBaseUrl: "/dig-modules/lithics",
            apiBaseUrl: "/api/lithics",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["FL", "AR",],
        },
        Metal: {
            module: "Metal",
            itemName: "Metal",
            collectionName: "Metals",
            storeModuleName: "mtl",
            appBaseUrl: "/dig-modules/metals",
            apiBaseUrl: "/api/metals",
            isDigModule: true,

            isFind: true,
            displayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["AR",],
        },
    }
}