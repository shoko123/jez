<?php

namespace App\Http\Controllers;

use App\JezStatic\WelcomePages;
use App\Models\TagType;
use App\Models\tags\FaunaTagType;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\JezStatic\ModuleGroupOrder;

class ModuleInitializerController extends Controller
{
    private static $groups = [];
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
            if (self::$isFind) {
                self::addModuleGroups(self::$moduleName);
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

        return response()->json([
            "groups" => self::$groups,
            "welcomeData" => [
                "counts" => $counts,
                "welcomePageParams" => WelcomePages::welcome(self::$moduleName),
                "firstDot" => $firstDot,
            ],

        ], 200);
    }

    private static function addModuleGroups()
    {
        $order = ModuleGroupOrder::getOrder(self::$moduleName);
        foreach ($order as $index => $group) {
            switch ($group[2]) {
                case "Lookup":
                    self::addLookupGroup($group);
                    break;
                case "Tag-Global":
                    self::addTagGlobalGroup($group);
                    break;
                case "Tag-Module":
                    self::addTagModuleGroup($group);
                    break;
            }
        }
    }

    private static function addLookupGroup($group)
    {
        $params =  DB::table($group[3])->get();

        array_push(self::$groups, [
            "category" => $group[0],
            "display_name" => $group[1],
            "group_type" => "Lookup",
            "table_name" => $group[3],
            "column_name" => $group[4],
            'params' => $params
        ]);
    }

    private static function addTagGlobalGroup($group)
    {
        $tagType = TagType::where('str_id', $group[3])
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'type');
            }])
            ->select('str_id', 'category', 'display_name', 'multiple', 'dependency')
            ->first();

        $params = [];
        foreach ($tagType->tags as $index => $tag) {
            array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
        }

        array_push(self::$groups, [
            "category" => $group[0],
            "display_name" => $group[1],
            "group_type" => "Tag",
            "str_id" => $group[3],
            "multiple" => $tagType->multiple,
            "dependency" => is_null($tagType->dependency) ? null : json_decode($tagType->dependency),
            'params' => $params
        ]);
    }

    private static function addTagModuleGroup($group)
    {
        $modelName = "App\\Models\\tags\\" . self::$moduleName . "TagType";
        $model = new $modelName;



        $tagType = $model->with(['tags' => function ($q) {
            $q->select('id', 'name', 'type_id');
        }])
            ->select('id', 'name AS str_id', 'category', 'display_name', 'multiple', 'dependency')
            ->where('name', $group[3])
            ->first();

        $params = [];
        foreach ($tagType->tags as $index => $tag) {
            array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
        }

        array_push(self::$groups, [
            "category" => $group[0],
            "display_name" => $group[1],
            "group_type" => "Tag",
            "str_id" => $group[3],
            "multiple" => $tagType->multiple,
            "dependency" => is_null($tagType->dependency) ? null : json_decode($tagType->dependency),
            'params' => $params
        ]);
    }

    private static function addRegistration()
    {
        array_push(self::$groups, [
            "category" => "Registration",
            "display_name" => "Seasons",
            "category_order" => 1,
            "group_type" => "Registration",
            "group_order" => 1,
            "name" => "Seasons",
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
            "display_name" => "Areas",
            "category_order" => 1,
            "group_type" => "Registration",
            "group_order" => 2,
            "name" => "Areas",
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
            "display_name" => "Media",
            "category_order" => 1,
            "group_type" => "Registration",
            "group_order" => 3,
            "name" => "Media",
            "params" => [
                ["id" => 1201, "name" => "Photo"],
                ["id" => 1202, "name" => "Drawing"],
                ["id" => 1203, "name" => "Plan"],

            ]
        ]);

        if (self::$isFind) {
            array_push(self::$groups, [
                "category" => "Registration",
                "display_name" => "Registration Categories",
                "category_order" => 1,
                "group_type" => "Registration",
                "group_order" => 4,
                "name" => "registration_categories",
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
                "display_name" => "Scopes",
                "category_order" => 1,
                "group_type" => "Registration",
                "group_order" => 5,
                "name" => "scopes",
                "params" => [
                    ["id" => "basket", "name" => "Basket"],
                    ["id" => "artifact", "name" => "Artifact"],
                ]
            ]);   
        }
    }

    private static function addPeriods()
    {
        $tagTypes = TagType::where('category', 'Period')
            ->with(['tags' => function ($q) {
                $q->select('id', 'name', 'type');
            }])
            ->select('str_id', 'subject', 'category', 'category_order', 'group_order', 'display_name', 'multiple', 'dependency')
            ->orderBy('category_order')
            ->orderBy('group_order')
            ->get();

        foreach ($tagTypes as $index => $tagType) {
            $params = [];
            foreach ($tagType->tags as $index => $tag) {
                array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
            }

            $periodGroup["category"] = $tagType->category;
            $periodGroup["display_name"] = $tagType->display_name;
            $periodGroup["group_type"] = "Tag";
            $periodGroup["str_id"] = $tagType->str_id;
            $periodGroup["category_order"] = $tagType->category_order;
            $periodGroup["group_order"] = $tagType->group_order;
            $periodGroup["multiple"] = $tagType->multiple;
            $periodGroup["dependency"] = is_null($tagType->dependency) ? null : json_decode($tagType->dependency);
            $periodGroup["params"] = $params;
            array_push(self::$groups, $periodGroup);
        }
    }
}
