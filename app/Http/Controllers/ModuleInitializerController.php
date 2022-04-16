<?php

namespace App\Http\Controllers;

use App\JezStatic\WelcomePages;
use App\Models\TagType;
use App\Models\tags\FaunaTagType;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ModuleInitializerController extends Controller
{
    private static $groups = [];
    private static $tagLookupGroups = [];
    private static $moduleName;
    private static $fullModuleName;
    private static $moduleHasTaggingSystem;
    private static $moduleUsesPeriods;
    private static $isFind;


    public function index(Request $request)
    {
        self::$isFind = false;
        self::$moduleHasTaggingSystem = true;
        self::$moduleUsesPeriods = false;

        switch ($request->input('moduleName')) {
            case "About":
            case "Area":
            case "Season":
                self::$moduleHasTaggingSystem = false;
                break;

            case "Stone":
            case "Lithic":
            case "Glass":
            case "Metal":
            case "Pottery":
                self::$moduleUsesPeriods = true;
            case "Flora":
            case "Fauna":
            case "Tbd":
                self::$isFind = true;
                break;
        }
        self::$moduleName = $request->input('moduleName');
        self::$fullModuleName = 'App\Models\Dig\\' . self::$moduleName;

        if (self::$moduleHasTaggingSystem) {
            self::addRegistration();
            if (self::$moduleUsesPeriods) {
                self::addPeriods();
            }
            self::addLookups();
            self::addTags();

            foreach (self::$groups as $key => $row) {
                $category_order[$key] = $row['category_order'];
                $group_order[$key] = $row['group_order'];
            }

            array_multisort($category_order, SORT_ASC, $group_order, SORT_ASC, self::$groups);

            //get rid of order columns
            foreach (self::$groups as $index => &$group) {
                unset($group["category_order"]);
                unset($group["group_order"]);
            }
        }

        //get counts
        $counts = [];
        $firstDot = null;
        $firstRecord = null;

        if (self::$moduleName !== 'About') {
            $counts['items'] = self::$fullModuleName::count();
            $counts['media'] = DB::table('media')->where('model_type', self::$moduleName)->count();


            switch (self::$moduleName) {

                case "Area":
                    $firstRecord = self::$fullModuleName::first();
                    $firstDot = $firstRecord->name;
                    break;
                case "Season":
                    $firstRecord = self::$fullModuleName::first();
                    $firstDot = $firstRecord->season;
                    break;
                case "AreaSeason":
                    $firstRecord = self::$fullModuleName::first();
                    $firstDot = $firstRecord->dot;
                    break;
                case "Locus":
                    $firstRecord = self::$fullModuleName::with('areaSeason')->first();
                    $firstDot = $firstRecord->areaSeason->dot . '.' . $firstRecord->locus_no;
                    break;
                case "Stone":
                case "Lithic":
                case "Glass":
                case "Metal":
                case "Pottery":
                case "Flora":
                case "Fauna":
                case "Tbd":
                    $firstRecord = self::$fullModuleName::with('find.locus.areaSeason')->first();

                    $firstDot = $firstRecord->find->locus->areaSeason->dot . '.' . $firstRecord->find->locus->locus_no . '.' . $firstRecord->find->registration_category . '.' . $firstRecord->find->basket_no . '.' . $firstRecord->find->artifact_no;
                    self::$isFind = true;
                    break;
            }
        }

        //$mapsBaseUrl = \Storage::disk('app-media')->url($fullMediaName);
        return response()->json([
            "groups" => self::$groups,
            "welcomeData" => [
                "counts" => $counts,
                "welcomePageParams" => WelcomePages::welcome(self::$moduleName),
                "firstDot" => $firstDot,
            ],

        ], 200);
    }

    private static function addRegistration()
    {
        array_push(self::$groups, [
            "category" => "Registration",
            "category_order" => 1,
            "group_type" => "Registration",
            "group_order" => 1,
            "name" => "Seasons",
            "display_name" => "Seasons",
            "params" => [
                ["id" => 1001, "name" => "2012"],
                ["id" => 1002, "name" => "2013"],
                ["id" => 1003, "name" => "2014"],
                ["id" => 1004, "name" => "2015"],
                ["id" => 1005, "name" => "2016"],
                ["id" => 1006, "name" => "2017"],
                ["id" => 1007, "name" => "2018"],
            ]
        ]);

        array_push(self::$groups, [
            "category" => "Registration",
            "category_order" => 1,
            "group_type" => "Registration",
            "group_order" => 2,
            "name" => "Areas",
            "display_name" => "Areas",
            "params" => [
                ["id" => 1101, "name" => "K"],
                ["id" => 1102, "name" => "L"],
                ["id" => 1103, "name" => "M"],
                ["id" => 1104, "name" => "N"],
                ["id" => 1105, "name" => "P"],
                ["id" => 1106, "name" => "Q"],
                ["id" => 1107, "name" => "S"],
            ]
        ]);

        array_push(self::$groups, [
            "category" => "Registration",
            "category_order" => 1,
            "group_type" => "Registration",
            "group_order" => 3,
            "name" => "Media",
            "display_name" => "Media",
            "params" => [
                ["id" => 1201, "name" => "Photo"],
                ["id" => 1202, "name" => "Drawing"],
                ["id" => 1203, "name" => "Plan"],

            ]
        ]);


        if (self::$isFind) {
            array_push(self::$groups, [
                "category" => "Registration",
                "category_order" => 1,
                "group_type" => "Registration",
                "group_order" => 4,
                "name" => "registration_categories",
                "display_name" => "Registration Categories",
                "params" => [
                    ["id" => 1, "name" => "PT"],
                    ["id" => 2, "name" => "GS"],
                    ["id" => 3, "name" => "FL"],
                    ["id" => 4, "name" => "LB"],
                    ["id" => 5, "name" => "AR"],
                ]
            ]);
        }
        if (self::$moduleName === "Pottery" || self::$moduleName === "Fauna") {
            array_push(self::$groups, [
                "category" => "Registration",
                "category_order" => 1,
                "group_type" => "Registration",
                "group_order" => 5,
                "name" => "scopes",
                "display_name" => "Scopes",
                "params" => [
                    ["id" => "basket", "name" => "Basket"],
                    ["id" => "artifact", "name" => "Artifact"],
                ]
            ]);
        }
    }

    private static function addPeriods()
    {
        switch (self::$moduleName) {
            case "Pottery":
            case "Stone":
            case "Lithic":
            case "Glass":
            case "Metal":
                break;
            default:
                return;
        }

        $tagTypes = TagType::where('category', 'Period')
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'type');
            }])
            ->get(['str_id', 'subject', 'category', 'category_order', 'group_order', 'display_name', 'multiple', 'dependency']);

        //format tags to fit $typesAndParams structure.

        $periodGroup = ["group_type" => "Tag"];
        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }

            $periodGroup["category"] = $tagType->category;
            //$periodGroup["group_type"] = "Tag";
            $periodGroup["str_id"] = $tagType->str_id;
            $periodGroup["category_order"] = $tagType->category_order;
            $periodGroup["group_order"] = $tagType->group_order;
            $periodGroup["display_name"] = $tagType->display_name;
            $periodGroup["multiple"] = $tagType->multiple;
            $periodGroup["dependency"] = is_null($tagType->dependency) ? null : json_decode($tagType->dependency);
            $periodGroup["params"] = $params;
            array_push(self::$groups, $periodGroup);
        }
    }

    private static function addLookups()
    {
        //change here if going to tag the Locus Module.
        if (!self::$isFind) {
            return;
        }

        $lookups = [];
        $order = [];
        switch (self::$moduleName) {
            case "Stone":
                $order = [3, 1];
                array_push($lookups, [
                    "category" => "Basic Characteristics",
                    "table_name" => "stone_materials",
                    "column_name" => "material_id",
                    "display_name" => "Material",
                    "category_order" => 3,
                    "group_order" => 2
                ]);

                array_push($lookups, [
                    "category" => "Basic Characteristics",
                    "table_name" => "stone_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 5,
                    "group_order" => 1
                ]);
                break;

            case "Lithic":
                $order = [3, 1];
                array_push($lookups, [
                    "category" => "Basic Characteristics",
                    "table_name" => "lithic_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 3,
                    "group_order" => 2
                ]);
                break;

            case "Glass":
                $order = [3, 1];
                array_push($lookups, [
                    "category" => "Basic Characteristics",
                    "table_name" => "glass_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 4,
                    "group_order" => 1
                ]);
                break;

            case "Metal":
                $order = [3, 1];
                array_push($lookups, [
                    "category" => "Basic Characteristics",
                    "table_name" => "metal_materials",
                    "column_name" => "material_id",
                    "display_name" => "Material",
                    "category_order" => 3,
                    "group_order" => 2
                ]);

                array_push($lookups, [
                    "category" => "Basic Characteristics",
                    "table_name" => "metal_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Typology",
                    "category_order" => 3,
                    "group_order" => 2
                ]);
                break;

            case "Pottery":
                $order = [5, 1];
                array_push($lookups, [
                    "category" => "Typology",
                    "table_name" => "pottery_base_types",
                    "column_name" => "base_type_id",
                    "display_name" => "Base Partition",
                    "category_order" => 11,
                    "group_order" => 1
                ]);
                break;

            case "Fauna":
                $order = [2, 1];

                array_push($lookups, [
                    "category" => "Taxon",
                    "table_name" => "fauna_taxon_L1",
                    "column_name" => "taxon_L1_id",
                    "display_name" => "Base Taxon",
                    "category_order" => 3,
                    "group_order" => 1
                ]);
                array_push($lookups, [
                    "category" => "Element",
                    "table_name" => "fauna_elements_L1",
                    "column_name" => "element_L1_id",
                    "display_name" => "Element",
                    "category_order" => 4,
                    "group_order" => 1
                ]);

                break;
        }

        //add preservation (common to all finds)
        array_push($lookups, [
            "category" => "Basic Characteristics",
            "table_name" => "preservations",
            "column_name" => "preservation_id",
            "display_name" => "Preservation",
            "category_order" => $order[0],
            "group_order" => $order[1]
        ]);

        //access DB and format
        foreach ($lookups as $index => $lookup) {
            $params = DB::table($lookup["table_name"])->get();

            array_push(self::$groups, [
                "category" => $lookup["category"],
                "group_type" => "Lookup",
                "category_order" => $lookup["category_order"],
                "group_order" => $lookup["group_order"],
                "column_name" => $lookup["column_name"],
                "display_name" => $lookup["display_name"],
                'params' => $params
            ]);
        }
    }
    private static function addTags()
    {

        if (self::$moduleName === 'Fauna') {
            //not About, Area, Season
            $tagTypes = FaunaTagType::with(['tags' => function ($q) {
                $q->select('id', 'name', 'type_id');
            }])
                ->get(['id', 'name AS str_id', 'category', 'category_order', 'group_order','display_name', 'multiple', 'dependency']);

            //format tags to fit $typesAndParams structure.
            $tagGroup = [];
            foreach ($tagTypes as $index => $tagType) {
                $params = [];
                foreach ($tagType->tags as $index => $tag) {
                    array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
                }
                $tagGroup["category"] = $tagType->category;
                $tagGroup["group_type"] = "Tag";
                $tagGroup["str_id"] = $tagType->str_id;
                $tagGroup["category_order"] = $tagType->category_order;
                $tagGroup["group_order"] = $index;
                $tagGroup["display_name"] = $tagType->display_name;
                $tagGroup["multiple"] = $tagType->multiple;
                $tagGroup["dependency"] = is_null($tagType->dependency) ? null : json_decode($tagType->dependency);
                $tagGroup["params"] = $tagType->tags;
                array_push(self::$groups, $tagGroup);
            }
            return;
        }

        //not About, Area, Season
        $tagTypes = TagType::where('subject', self::$moduleName)
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'type');
            }])
            ->get(['category', 'str_id', 'category_order', 'group_order', 'display_name', 'multiple', 'dependency']);

        //format tags to fit $typesAndParams structure.
        $tagGroup = [];
        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }
            $tagGroup["category"] = $tagType->category;
            $tagGroup["group_type"] = "Tag";
            $tagGroup["str_id"] = $tagType->str_id;
            $tagGroup["category_order"] = $tagType->category_order;
            $tagGroup["group_order"] = $tagType->group_order;
            $tagGroup["display_name"] = $tagType->display_name;
            $tagGroup["multiple"] = $tagType->multiple;
            $tagGroup["dependency"] = is_null($tagType->dependency) ? null : json_decode($tagType->dependency);
            $tagGroup["params"] = $params;

            array_push(self::$groups, $tagGroup);
        }
    }
}
