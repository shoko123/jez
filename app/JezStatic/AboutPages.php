<?php

namespace App\JezStatic;

class AboutPages
{
    private static $tabs = ["The Dig", "The Website"];
    private static $types = ["Text", 0];

    private static $items = [
        [
            "tab" => 1,
            "no" => 1,
            "type" => 1,
            "image" => "jez-exp",
            "title" => "Introduction",
            "text" => ["The Jezreel Expedition was a survey (2012) and excavation (2013-2018) project focused on reconstructing
                    the settlement history of \"greater Jezreel\" in Israel's Jezreel Valley. The project was sponsored by the Zinman 
                    Institute of Archaeology at the University of Haifa, Israel, and the University of Evansville, Indiana, USA and co-directed by Norma Franklin 
                    (U Haifa) and Jennie Ebeling (U Evansville).", ],
        ],
        [
            "tab" => 1,
            "no" => 2,
            "type" => 1,
            "image" => "jezreel-valley",
            "title" => "Location",
            "text" => ["Jezreel is located at the midway point of the Jezreel Valley, the largest east-west valley in Israel, on 
                    the edge of the Gilboa mountain range. The international highway the Via Maris (\"Way of the Sea\") ran through the valley floor and linked the site
                    to Megiddo (Armageddon) to the west and Bet Shean (Scythopolis) to the east. The Jezreel Valley takes its name from the 
                    site, which means \"God sows\" or \"God makes fruitful\" in Hebrew. Its rich agricultural land and copious springs
                    made the valley an attractive place for settlement for the last 8,000 years.", ],
        ],
        [
            "tab" => 1,
            "no" => 3,
            "type" => 1,
            "image" => "ein-tel-jezreel",
            "title" => "Tel Ein Jezreel",
            "text" => ["Excavations 2013-2018 focused on a newly-identified site we named Tel Ein Jezreel. Located immediately
                    south of the spring Ein Jezreel (\"Spring of Jezreel\"), this site was inhabited from at least as early as the Late
                    Late Neolithic period and appears to have reached its peak of settlement in the Early Bronze Age. Tel Ein Jezreel is 
                    located approximately one kilometer north of Tel Jezreel, a foothill of the Gilboa mountain range that was excavated
                    in the 1990s by the Tel Aviv University-British School of Archaeology in Jerusalem team and believed to be the site of biblical Jezreel known from 1 and 2 Kings." 
                 ],
        ],
         [
            "tab" => 1,
            "no" => 4,
            "type" => 1,
            "image" => "tel-ein-baloon",
            "title" => "Project Goals",
            "text" => ["The main goals of the Jezreel Expedition team were to reconstruct the changing nature of settlement and
                    the human impact on the environment of \"greater Jezreel\" during the longue duree. We began by commissioning
                    a LiDAR (light detection and ranging) scan of 7.5 square km of greater Jezreel and conducting a traditional
                    foot survey of the core area, some 3 square km. The results shed light on the different settlements at Jezreel
                    from late prehistory through the 20th century and led us to choose several areas for excavation starting in 2013.", ],
        ],
        [
            "tab" => 1,
            "no" => 5,
            "type" => 1,
            "image" => "winery",
            "title" => "Project Results",
            "text" => ["In the 2016 dig season a large winery complex was exposed in area S, between Tel Jezreel and Tel Ein Jezreel. 
                Due to its scale and complexety it has been suggested that it may related to biblical story of Naboth.", ],
        ],
        [
            "tab" => 1,
            "no" => 6,
            "type" => 1,
            "image" => "sponsers",
            "title" => "Ongoing Research",
            "text" => ["In addition to analyzing the results of six seasons of excavation in preparation for publication, members of the
                    Jezreel Expedition team, an international team of researchers, and archaeology students and alumni from the University 
                    of Evansville continue to research the long and fascinating history of the site.", ],
        ],
        [
            "tab" => 1,
            "no" => 7,
            "type" => 1,
            "image" => "sponsers",
            "title" => "Sponsors",
            "text" => ["The Jezreel Expedition was sponsored by eight consortium institutions in addition to the University of Haifa
                    and the University of Evansville: Campbell University, Chapman University, Moravian Theological Seminary, San Francisco
                    Theological Seminary/Graduate Theological Union, University of Arizona, Vanderbilt University, Villanova University, and
                    Wesley Theological Seminary. In addition to being an ASOR-Affiliated field and research project, the Jezreel Expedition's 
                    field school was certified by the Register of Professional Archaeologists (RPA). Support was also provided by the Foundation 
                    for Biblical Archaeology (Sheila Bishop), our generous donors, and members of Kibbutz Yizra'el. We are grateful to them all.", ],
        ],
        [
            "tab" => 2,
            "no" => 1,
            "type" => 0,
            "image" => "baskets2",
            "title" => "What is this Website?",
            "text" => ["This website serves as a central repository of information about the material remains excavated by the 
                    Jezreel Expedition. The bulk of the website consists of detailed, media-rich records of the small finds 
                    and their immediate contexts (loci).", ],
        ],
        [
            "tab" => 2,
            "no" => 2,
            "type" => 0,
            "image" => "ann",
            "title" => "Motivation",
            "text" => ["The Jezreel Expedition yielded a surprisingly large number of small finds. During the field seasons, registration was
                done on paper and the data were input into excel spreadsheets. In addition, thousands of field and small finds photos were were 
                taken each season. This database provides an integrated system that allows for easy retrieval of information recorded for the
                small finds (both textual and media) and their contexts (loci).",],
        ],
         [
            "tab" => 2,
            "no" => 3,
            "type" => 0,
            "image" => "nate",
            "title" => "Registration System",
            "text" => ["Every find was registered according to locus, pottery basket, and type. Locus numbers are year/area/locus (for example, 14/S/123)
            pottery basket numbers (PT) are added to the locus number (for example, 14/S/123.PT1) and types include pottery (PT), ground stone (GS), lithics (FL), 
            lab (LB) and special finds (AR). The database uses this basic schema but is organized by material (pottery, stones, lithics, glass, metal, flora
            fauna). In addition, specific artifacts within a basket are given their own number in this database. For example, 14/S/123.GS.2.3 is the third stone
            object in ground stone basket 2 which belongs to locus 14/S/123.",], 
        ],
        [
            "tab" => 2,
            "no" => 4,
            "type" => 0,
            "image" => "coffee",
            "title" => "Technical Details",
            "text" => ["Backend: MySql, Laravel, Spatie (backups, permissions, medialibrary, tags), tymon/jwt-auth, lazychaser/laravel-nestedset.
                Frontend: Vue, axios, Vuetify, Vuelidate, Vue-router, Vuex, normalizr, SortableJS/Vue.Draggable.
                Proudly hosted on a $5 Digital Ocean Ubuntu droplet.", ],
        ],
        [
            "tab" => 2,
            "no" => 5,
            "type" => 0,
            "image" => "theodolite",
            "title" => "Current Status",
            "text" => ["This website should be considered a work in progress in terms of the website itself and the data it contains.
                Some software modules are still bluntly missing,
                as are the thousands of pictured that are yet to be uploaded,
                and the missing tags, identifications, comments, and analyses yet to be added by specialists.", ],
        ],
        [
            "tab" => 2,
            "no" => 6,
            "type" => 0,
            "image" => "bulk-baloon",
            "title" => "Future and Prospects",
            "text" => ["We hope to improve this website and add more features as time allows.
                Some high priority items are:",
                "- implement a generic spatial unit Module (e.g. Wall, Space, Structure, Room, etc...)",
                "- organized these spatial units in a tree structure for easy 'navigation' around the dig.",
                "- add Flora, and Fauna and modules.",
                "- add responsive design.",
                "- add summaries and statistics.",
                "- finish authorization and administrative modules.",
                "- migrate to Vue3 and typescript."],
        ],
        [
            "tab" => 2,
            "no" => 7,
            "type" => 0,
            "image" => "mouse",
            "title" => "A few middle-thoughts",
            "text" => [
                "1. While this database does not replace a final report, it can greatly enhance it by allowing
                    the inclusion of numerous media and querying tools which allow fellow researchers, and the public at large,
                    a far more complete picture of the excavation than possible in printed form.",
                "2. As technology changes rapidly and requires constant maintenance and updates this
                website is facing an inevitable demise without institutional support."],
        ],

    ];
    public static function index()
    {
        $mapped = array_map(function ($v, $k) {
            return (object) ["tab" => $v["tab"], "type" => $v["type"], "id" => $k, "title" => strval($v["tab"]) . "." . strval($v["no"]) . " " . $v["title"]];
        }, self::$items, array_keys(self::$items));
        return $mapped;
    }

    public static function show($id): object
    {
        $item = (object) self::$items[$id];
        $formatted_item = clone $item;
        $formatted_item->id = $id;
        $formatted_item->title = strval($item->tab) . "." . strval($item->no) . " " . $item->title;
        $formatted_item->fullUrl = \Storage::disk('app-media')->url('about/' . $item->tab . '/' . $item->image . '.jpg');
        $formatted_item->tnUrl = \Storage::disk('app-media')->url('about/' . $item->tab . '/' . $item->image . '-tn.jpg');
        return $formatted_item;
    }

    public function app_media(Request $request)
    {
        $backgroundUrls = [];

        $myModels = array("App", "About", "Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Metal", "Glass", "Flora", "Fauna", "Tbd");

        foreach ($myModels as $modelName) {
            $fullMediaName = 'backgrounds/' . $modelName . '.jpg';
            $thumbMediaName = 'backgrounds/' . $modelName . '-tn.jpg';
            //$backgroundUrls[$modelName] = \Storage::disk('app-media')->url($fullMediaName);

            $backgroundUrls[$modelName] = (object) [
                'fullUrl' => \Storage::disk('app-media')->url($fullMediaName),
                'tnUrl' => \Storage::disk('app-media')->url($thumbMediaName),
            ];
        }
        $carouselItems = [];
        $carouselTexts = ["Welcome! This website displays the results of an 8-year expedition to Tel-Ein-Jezreel.",
            "It is aimed at a fuller expopsure of the dig`s data than available in paper format.",
            "We strive to facilitate intuitive search and links to context data",
            "The database was design from its inception to be media rich.",
            "I am very tired and fat.",
            "",
            ""];

        foreach ($carouselTexts as $index => $text) {
            $fullMediaName = 'carousel/item' . $index . '.jpg';
            array_push($carouselItems, (object) ['text' => $text, 'url' => \Storage::disk('app-media')->url($fullMediaName)]);
        }

        return response()->json([
            "message" => "succesfully loaded app_media",
            "appMedia" => [
                "backgroundUrls" => $backgroundUrls,
                "carouselItems" => $carouselItems,
            ],
        ], 200);
    }
}
