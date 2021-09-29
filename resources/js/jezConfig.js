export default {

    mediaPerPage: 18,
    chipsPerPage: 100,
    
    myModules: {
        Home: {   
            appBaseUrl: "/",
        },  
        Auth: {
            storeName: "aut",
            appBaseUrl: "/auth",
            apiBaseUrl: null,
            isDigModule: false,
            isFind: false
        }, 
        Admin: {
            storeName: "aut",
            appBaseUrl: "/admin",
            apiBaseUrl: null,
            isDigModule: false,
            isFind: false
        },             
        About: {          
            storeName: "about",
            collectionName: "About",
            appBaseUrl: "/about",
            apiBaseUrl: "/api/about",
        },
        Area: {
            module: "area",
            itemName: "Area",
            collectionName: "Areas",
            storeName: "area",
            appBaseUrl: "/dig-modules/areas",
            apiBaseUrl: "/api/areas",
            itemDisplayOptions: ["Main", "Gallery"],
        },
        Season: {
            module: "Season",
            itemName: "Season",
            collectionName: "Seasons",
            storeName: "season",
            appBaseUrl: "/dig-modules/seasons",
            apiBaseUrl: "/api/seasons",
            itemDisplayOptions: ["Main", "Gallery"],
        },
        AreaSeason: {
            module: "areaSeason",
            itemName: "AreaSeason",
            collectionName: "Areas/Seasons",
            storeName: "arsn",
            appBaseUrl: "/dig-modules/areas-seasons",
            apiBaseUrl: "/api/areas-seasons",
            itemDisplayOptions: ["Main", "Gallery", "Loci Gallery"],
        },

        Locus: {
            module: "loci",
            itemName: "Locus",
            collectionName: "Loci",
            storeName: "loci",
            appBaseUrl: "/dig-modules/loci",
            apiBaseUrl: "/api/loci",
            isDigModule: true,

            isFind: false,
            itemDisplayOptions: ["Main", "Locus Gallery", "Finds Gallery"],
        },
        Pottery: {
            module: "pottery",
            itemName: "Pottery",
            collectionName: "Pottery",
            storeName: "pot",
            appBaseUrl: "/dig-modules/pottery",
            apiBaseUrl: "/api/pottery",
            isDigModule: true,

            isFind: true,
            itemDisplayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["PT", "AR"],
        },
        Stone: {
            module: "stones",
            itemName: "Stone",
            collectionName: "Stones",
            storeName: "stones",
            appBaseUrl: "/dig-modules/stones",
            apiBaseUrl: "/api/stones",
            isDigModule: true,

            isFind: true,
            itemDisplayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["GS", "AR"],
        },
        Glass: {
            module: "Glass",
            itemName: "Glass",
            collectionName: "Glass",
            storeName: "glass",
            appBaseUrl: "/dig-modules/glass",
            apiBaseUrl: "/api/glass",
            isDigModule: true,

            isFind: true,
            itemDisplayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["AR",],
        },
        Lithic: {
            module: "Lithic",
            itemName: "Lithic",
            collectionName: "Lithics",
            storeName: "lith",
            appBaseUrl: "/dig-modules/lithics",
            apiBaseUrl: "/api/lithics",
            isDigModule: true,

            isFind: true,
            itemDisplayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["FL", "AR",],
        },
        Metal: {
            module: "Metal",
            itemName: "Metal",
            collectionName: "Metals",
            storeName: "mtl",
            appBaseUrl: "/dig-modules/metals",
            apiBaseUrl: "/api/metals",
            isDigModule: true,

            isFind: true,
            itemDisplayOptions: ["2-panel", "3-panel", "Gallery"],
            registrationOptions:
                ["AR",],
        },
    }
}