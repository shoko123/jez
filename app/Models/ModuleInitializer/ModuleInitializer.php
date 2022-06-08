<?php

namespace App\Models\ModuleInitializer;

use App\JezStatic\WelcomePages;
use App\Models\TagType;

use Illuminate\Http\Request;


use App\JezStatic\ModuleGroupOrder;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Collection;

class ModuleInitializer extends Model
{
    private static $finds = ["Pottery", "Stone", "Lithic", "Fauna", "Flora", "Metal", "Glass", "Tbd"];

    private static $groups = [];
    private static $moduleName;
    private static $fullModuleName;
    private static $counts = [];
    private static $firstDot = null;

    public static function init(string $modulelName): array
    {
        self::$moduleName = $modulelName;
        self::$fullModuleName = 'App\Models\Dig\\' . self::$moduleName;

        self::getFirstDot();
        self::getCounts();
        self::addRegistrationGroups();
        self::addModuleGroups();

        return [
            "groups" => self::$groups,
            "welcomeData" => [
                "counts" => self::$counts,
                "welcomePageParams" => WelcomePages::welcome(self::$moduleName),
                "firstDot" => self::$firstDot,
            ],
        ];
    }

    private static function addModuleGroups()
    {
        if (in_array(self::$moduleName, self::$finds) || self::$moduleName === "Locus") {
            $categories = ModuleGroupOrder::getCategories(self::$moduleName);

            foreach ($categories as $category => $groups) {
                foreach ($groups as $group) {
                    switch ($group[1]) {
                        case "Lookup":
                            self::addLookupGroup($category, $group);
                            break;
                        case "Tag-Global":
                            self::addTagGroup($category, $group, true);
                            break;
                        case "Tag-Module":
                            self::addTagGroup($category, $group, false);
                            break;
                    }
                }
            }
        }
    }

    private static function addLookupGroup($category, $group)
    {
        $params =  DB::table($group[2])->get();

        array_push(self::$groups, [
            "category" => $category,
            "display_name" => $group[0],
            "group_type" => "Lookup",
            "table_name" => $group[2],
            "column_name" => $group[3],
            'params' => $params
        ]);
    }

    private static function addTagGroup($category, $group, $isGlobalTag)
    {
        $tagType = null;

        if ($isGlobalTag) {
            $tagType = TagType::where('str_id', $group[2])
                ->with(['tags' => function ($q) {
                    $q->select('id', 'name', 'type');
                }])
                ->select('str_id', 'category', 'display_name', 'multiple', 'dependency')
                ->first();
        } else {
            $modelName = "App\\Models\\Tags\\" . self::$moduleName . "TagType";
            $model = new $modelName;

            $tagType = $model->with(['tags' => function ($q) {
                $q->select('id', 'name', 'type_id');
            }])
                ->select('id', 'name AS str_id', 'multiple', 'dependency')
                ->where('name', $group[2])
                ->first();
        }
        $params = [];
        foreach ($tagType->tags as $index => $tag) {
            array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
        }

        array_push(self::$groups, [
            "category" => $category,
            "display_name" => $group[0],
            "group_type" => "Tag",
            "isGlobalTag" => $isGlobalTag,
            "str_id" => $tagType->str_id,
            "tag_type_id" => $isGlobalTag ? null : $tagType->id,
            "multiple" => $tagType->multiple,
            "dependency" => is_null($tagType->dependency) ? null : json_decode($tagType->dependency),
            'params' => $params
        ]);
    }

    private static function addRegistrationGroups()
    {
        if (in_array(self::$moduleName, ["About", "Area", "Season"])) {
            return;
        }

        array_push(self::$groups, [
            "category" => "Registration",
            "display_name" => "Seasons",
            "group_type" => "Registration",
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
            "group_type" => "Registration",
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
            "group_type" => "Registration",
            "name" => "Media",
            "params" => [
                ["id" => 1201, "name" => "Photo"],
                ["id" => 1202, "name" => "Drawing"],
                ["id" => 1203, "name" => "Plan"],
            ]
        ]);



        if (in_array(self::$moduleName, self::$finds)) {
            array_push(self::$groups, [
                "category" => "Registration",
                "display_name" => "Registration Categories",
                "group_type" => "Registration",
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
        if (in_array(self::$moduleName, ["Pottery", "Fauna"])) {
            array_push(self::$groups, [
                "category" => "Registration",
                "display_name" => "Scopes",
                "group_type" => "Registration",
                "name" => "scopes",
                "params" => [
                    ["id" => "basket", "name" => "Basket"],
                    ["id" => "artifact", "name" => "Artifact"],
                ]
            ]);
        }
    }

    public static function getCounts()
    {
        if (self::$moduleName !== 'About') {
            self::$counts['items'] = self::$fullModuleName::count();
            self::$counts['media'] = DB::table('media')->where('model_type', self::$moduleName)->count();
        }
    }

    public static function getFirstDot()
    {
        $firstRecord = null;

        if (self::$moduleName !== 'About') {
            $counts['items'] = self::$fullModuleName::count();
            $counts['media'] = DB::table('media')->where('model_type', self::$moduleName)->count();

            switch (self::$moduleName) {

                case "Area":
                    $firstRecord = self::$fullModuleName::first();
                    self::$firstDot = $firstRecord->name;
                    break;
                case "Season":
                    $firstRecord = self::$fullModuleName::first();
                    self::$firstDot = $firstRecord->season;
                    break;
                case "AreaSeason":
                    $firstRecord = self::$fullModuleName::first();
                    self::$firstDot = $firstRecord->dot;
                    break;
                case "Locus":
                    $firstRecord = self::$fullModuleName::with('areaSeason')->first();
                    self::$firstDot = $firstRecord->areaSeason->dot . '.' . $firstRecord->locus_no;
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
                    self::$firstDot = $firstRecord->find->locus->areaSeason->dot . '.' . $firstRecord->find->locus->locus_no . '.' . $firstRecord->find->registration_category . '.' . $firstRecord->find->basket_no . '.' . $firstRecord->find->artifact_no;
                    break;
            }
        }
    }
}
