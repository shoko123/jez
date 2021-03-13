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
            "image" => "basalt-shades",
            "title" => "Introduction",
            "text" => ["The Jezreel Expedition was a survey (2012) and excavation (2013-2018) project focused on reconstructing
                    the settlement history of \"greater Jezreel\" in Israel's Jezreel Valley.", "The project was sponsored by the Zinman
                    Institute of Archaeology at the University of Haifa, Israel, and the University of Evansville, Indiana, USA.", 
                    "Norma Franklin (University of Haifa) and Jennie Ebeling (University of Evansville) co-directed the project.", ],
        ],
        [
            "tab" => 1,
            "no" => 2,
            "image" => "top-map",
            "title" => "Location",
            "text" => ["Jezreel is located at the midway point of the Jezreel Valley, the largest east-west valley in Israel, on
                    the edge of the Gilboa mountain range. The international highway the Via Maris (\"Way of the Sea\") ran through the valley floor and linked the site
                    to Megiddo (Armageddon) to the west and Bet Shean (Scythopolis) to the east. The Jezreel Valley takes its name from the
                    site, which means \"God sows\" in Hebrew. Its rich agricultural land and copious springs
                    made the valley an attractive place for settlement for the last 8,000 years.", ],
        ],
        [
            "tab" => 1,
            "no" => 3,
            "image" => "tel-and-ein",
            "title" => "Tel Ein Jezreel",
            "text" => ["Excavations 2013-2018 focused on the newly-identified site Tel Ein Jezreel. Located immediately
                    south of the spring called Ein Jezreel (\"Spring of Jezreel\"), this site was inhabited from at least as early as the
                    Late Neolithic period and appears to have reached its peak of settlement in the Early Bronze Age. Tel Ein Jezreel is
                    located approximately one kilometer north of Tel Jezreel, a foothill of the Gilboa mountain range that was excavated
                    in the 1990s and believed to be the location of biblical Jezreel described in 1 and 2 Kings.",
            ],
        ],
        [
            "tab" => 1,
            "no" => 4,
            "image" => "olives",
            "title" => "Project Goals",
            "text" => ["The main goals of the Jezreel Expedition team were to reconstruct the changing nature of settlement and
                    the human impact on the environment of \"greater Jezreel.\" We began by commissioning
                    a LiDAR (light detection and ranging) scan of 7.5 square km of greater Jezreel and conducting a traditional
                    foot survey of the core area, some 3 square km. The results shed light on the different settlements at Jezreel
                    from late prehistory through the 20th century and led us to choose several areas for excavation starting in 2013.", ],
        ],
        [
            "tab" => 1,
            "no" => 5,
            "image" => "tel-ein-baloon", 
            "title" => "Project Results",
            "text" => ["Excavations in Area S - our main excavation area in Tel Ein Jezreel - yielded evidence for human settlement from as early as the Late Neolithic Period. The site was inhabited during all phases of the Early Bronze Age and
                        sporadically in later periods (Iron, Persian, Roman, Medieval). Discoveries in other excavation areas include an Iron
                        Age winery complex, Middle Bronze shaft tombs, and a series of paths connecting Tel Jezreel and
                        Tel Ein Jezreel to the spring below.", ],
        ],
        [
            "tab" => 1,
            "no" => 6,
            "image" => "shade",
            "title" => "Ongoing Research",
            "text" => ["In addition to analyzing the results of six seasons of excavation in preparation for publication, members of the
                    Jezreel Expedition team, an international team of researchers, and archaeology students and alumni from the University
                    of Evansville continue to research the long and fascinating history of the site.", ],
        ],
        [
            "tab" => 1,
            "no" => 7,
            "image" => "banners",
            "title" => "Sponsors",
            "text" => ["The Jezreel Expedition was sponsored by eight consortium institutions: Campbell University, Chapman University, Moravian Theological Seminary, San Francisco
                    Theological Seminary/Graduate Theological Union, University of Arizona, Vanderbilt University, Villanova University, and
                    Wesley Theological Seminary. In addition to being an ASOR-Affiliated field and research project, the Jezreel Expedition's
                    field school was certified by the Register of Professional Archaeologists (RPA). Support was also provided by the Foundation
                    for Biblical Archaeology (Sheila Bishop), other generous donors, and members of Kibbutz Yizra'el. We are grateful to them all.", ],
        ],
        [
            "tab" => 2,
            "no" => 1,
            "image" => "baskets1",
            "title" => "What is this Website?",
            "text" => ["This website serves as a central repository of information about the material remains excavated by the
                    Jezreel Expedition. The bulk of the website consists of detailed, media-rich records of the small finds
                    and their immediate contexts (loci).", ],
        ],
        [
            "tab" => 2,
            "no" => 2,
            "image" => "camera",
            "title" => "Motivation",
            "text" => ["The Jezreel Expedition yielded a surprisingly large number of small finds, including the largest ground stone 
            assemblage excavated at an archaeological site in Israel. This was the motivation for creating this database. During the 
            field seasons, recording was initially done on paper and then entered into excel spreadsheets. In addition, many thousands of 
            field and object photos were taken. This database provides a unified system for easy data retrieval.", ],
        ],
        [
            "tab" => 2,
            "no" => 3,
            "image" => "registration",
            "title" => "Registration System",
            "text" => ["Every find was registered according to locus, pottery basket, and registration type [pottery (PT), ground 
            stone (GS), lithics (FL), lab (LB) and special finds (AR)]. Locus numbers include year/area/locus (for example, 14/S/123).
            Small finds were either assigned an individual number or were part of a basket. For example, 14/S/123PT1 refers to a 
            pottery basket in locus 14/S/123 and 14/S/123PT1.5 refers to a specific item in this pottery basket.", ],
        ],
        [
            "tab" => 2,
            "no" => 4,
            "image" => "hierarchy",
            "title" => "Database Organization",
            "text" => ["This database may be abstracted as four tiers, each containing modules of interest as shown. 
            The different modules may be reached from the main menu. Within each module, facilities for filtering and 
            viewing are available in the submenu. Since excavation revealed only partial architectural remains, 
            more detailed spatial information (e.g. buildings, rooms, walls, etc.) were not given
            individual modules. Inter and intra module movements are easily facilitated using self-explanatory navigation."],
        ],
        [
            "tab" => 2,
            "no" => 5,
            "image" => "elizabeth",
            "title" => "Software Stack Used",
            "text" => ["Backend: MySql, Nginx, Laravel, Spatie (Backups, Permissions, Medialibrary, Tags), Tymon/Jwt-auth, Lazychaser/Laravel Nestedset.
                Frontend: Vue, Axios, Vuetify, Vuelidate, Vue Router, Vuex, Normalizr. Proudly hosted on a $5 Digital Ocean Ubuntu droplet.", ],
        ],
        [
            "tab" => 2,
            "no" => 6,
            "image" => "mouse",
            "title" => "Current Status",
            "text" => ["This website should be considered a work in progress in terms of the website itself and the data it contains.
                The locus collection is complete but only the images from the survey season (2012) are currently uploaded.
                The stone collection is the most complete and 20% of the stone objects are tagged.
                Most of the pottery basket images are uploaded but very little tagging has yet been done.
                We continue to add records, descriptions, media, and tagging as resources and time allow.", ],
        ],
        /*
        [
            "tab" => 2,
            "no" => 7,
            "image" => "mouse",
            "title" => "A few middle-thoughts",
            "text" => [
                "1. While this database does not replace a final report, it can greatly enhance it by allowing
                    the inclusion of numerous media and querying tools which allow fellow researchers, and the public at large,
                    a far more complete picture of the excavation than possible in printed form.",
                "2. As technology changes rapidly and requires constant maintenance and updates this
                website is facing an inevitable demise without institutional support."],
        ],
        */
    ];
    public static function index()
    {
        $mapped = array_map(function ($v, $k) {
            return (object) ["tab" => $v["tab"], "id" => $k, "title" => strval($v["tab"]) . "." . strval($v["no"]) . " " . $v["title"]];
        }, self::$items, array_keys(self::$items));
        return $mapped;
    }

    public static function show($id): object
    {
        $item = (object) self::$items[$id];
        $formatted_item = clone $item;
        $formatted_item->id = $id;
        $formatted_item->title = strval($item->tab) . "." . strval($item->no) . " " . $item->title;
        $formatted_item->fullUrl = \Storage::disk('app-media')->url('about/' .  $item->image . '.jpg');
        $formatted_item->tnUrl = \Storage::disk('app-media')->url('about/' . $item->image . '-tn.jpg');
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
