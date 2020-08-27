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
            isImplemented: true,
            isFind: false,
            displayOptions: ["locus and finds", "locus gallery", "finds gallery", "all",],
        },
        Pottery: {
            module: "pottery",
            itemName: "Pottery",
            collectionName: "pottery",
            storeModuleName: "pottery",
            appBaseUrl: "/finds/pottery",
            apiBaseUrl: "/api/pottery",
            isDigModule: true,
            isImplemented: true,
            isFind: true,
            displayOptions: ["data", "gallery", "all"],
            registrationOptions:
            [
                { registration_category: "PT", basket: true, item: false },
                { registration_category: "AR", basket: true, item: true },
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
            isImplemented: true,
            isFind: true,
            displayOptions: ["data", "gallery", "2/3"],            
            registrationOptions:
            [
                { registration_category: "GS", basket: true, item: true },
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
            isImplemented: true,
            isFind: false                    
        },
    }

        /*
        myModules: [
            {
                module: "loci",
                itemName: "Locus",
                collectionName: "loci",
                storeModuleName: "loci",
                appBaseUrl: "/loci",
                apiBaseUrl: "/api/loci",
            },
            {
                module: "pottery",
                itemName: "Pottery",
                collectionName: "pottery",
                storeModuleName: "pottery",
                appBaseUrl: "/finds/pottery",
                apiBaseUrl: "/api/pottery",
            },
            {
                module: "stones",
                itemName: "Stone",
                collectionName: "stones",
                storeModuleName: "stones",
                appBaseUrl: "/finds/stones",
                apiBaseUrl: "/api/stones",
            },
        ],
        */

    }