export default {
    myModules: {
        Locus: {
            module: "loci",
            itemName: "Locus",
            collectionName: "loci",
            storeModuleName: "loci",
            appBaseUrl: "/loci",
            apiBaseUrl: "/api/loci",
            isDigModule: true,

            isFind: false,
            displayOptions: ["Main View", "Locus Gallery", "Finds Gallery", "All",],
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
                [
                    { registration_category: "PT", basket: true, item: false },
                    { registration_category: "AR", basket: false, item: true },
                ],
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
                [
                    { registration_category: "GS", basket: true, item: true },
                    { registration_category: "AR", basket: false, item: true },
                ],
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
                [
                    { registration_category: "AR", basket: false, item: true },
                ],
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
                [
                    { registration_category: "FL", basket: true, item: true },
                    { registration_category: "AR", basket: false, item: true },
                ],
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
                [
                    { registration_category: "AR", basket: false, item: true },
                ],
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