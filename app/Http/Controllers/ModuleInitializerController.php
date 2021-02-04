<?php

namespace App\Http\Controllers;

use App\JezStatic\WelcomePages;
use App\Models\TagType;
use Illuminate\Http\Request;

class ModuleInitializerController extends Controller
{
    private static $generalFilters = [
        ["group_type" => "Registration", "group_category" => "Registration", "category_order" => 1, "group_order" => 1, "id" => 1000, "name" => "Seasons", "display_name" => "Seasons", "params" => [
            ["id" => 1001, "name" => "2012"],
            ["id" => 1002, "name" => "2013"],
            ["id" => 1003, "name" => "2014"],
            ["id" => 1004, "name" => "2015"],
            ["id" => 1005, "name" => "2016"],
            ["id" => 1006, "name" => "2017"],
            ["id" => 1007, "name" => "2018"],
        ]],
        ["group_type" => "Registration", "group_category" => "Registration", "category_order" => 1, "group_order" => 2, "id" => 1001, "name" => "Areas", "display_name" => "Areas", "params" => [
            ["id" => 1101, "name" => "K"],
            ["id" => 1102, "name" => "L"],
            ["id" => 1103, "name" => "M"],
            ["id" => 1104, "name" => "N"],
            ["id" => 1105, "name" => "P"],
            ["id" => 1106, "name" => "Q"],
            ["id" => 1107, "name" => "S"],
        ]],
        ["group_type" => "Registration", "group_category" => "Registration", "category_order" => 1, "group_order" => 3, "id" => 1002, "name" => "Media", "display_name" => "Media", "params" => [
            ["id" => 1201, "name" => "Photo"],
            ["id" => 1202, "name" => "Drawing"],
            ["id" => 1203, "name" => "Plan"],

        ]],
    ];

    public static function remove($x)
    {
        unset($x->category_order);
        unset($x->group_order);
        return $x;
    }

    public function index(Request $request)
    {
        $moduleName = $request->input('moduleName');
        $fullModelName = 'App\Models\Dig\\' . $moduleName;
        $isFind = false;
        $tagTypes = [];
        $tagGroups = [];

        $isTaggable = false;
        $isFind = false;
        $addRegistrationGroups = false;

        switch ($moduleName) {
            case "Area":
            case "Season":
            case "About":
                $isTaggable = false;
                $isFind = false;
                $addRegistrationGroups = false;
                break;

            case "AreaSeason":
            case "Locus":
                $isTaggable = true;
                $isFind = false;
                $addRegistrationGroups = true;
                break;

            case "Stone":
            case "Lithic":
            case "Glass":
            case "Metal":
            case "Pottery":
            case "Flora":
            case "Fauna":
            case "Tbd":
                $isTaggable = true;
                $isFind = true;
                $addRegistrationGroups = true;
                break;
        }

        //All module except 'Area', 'Season' & 'About' load tagging configuration data
        if ($isTaggable) {
            //for loci and finds, get tags that belong to this module and 'Period' tags
            $tagTypes = TagType::where('subject', $moduleName)->orWhere('subject', 'Period')
                ->with(['tags' => function ($q) {
                    $q->select('id', 'name', 'type');}])
                ->get(['str_id', 'subject', 'category', 'category_order', 'group_order', 'display_name', 'multiple', 'dependency']);

            //format tags to fit $typesAndParams structure.
            foreach ($tagTypes as $index => $tagType) {
                $params = [];
                foreach ($tagType->tags as $index => $tag) {
                    array_push($params, ['id' => $tag->id, 'name' => $tag->name]);
                }
                $tagType["group_type"] = 'Tag';
                $tagType["group_category"] = $tagType->category;
                $tagType["dependency"] = json_decode($tagType->dependency);
                $tagType["params"] = $params;
                unset($tagType->tags);
            }
            $tagGroups = $tagTypes->toArray();
        }

        //get lookup values for module (used by filter, and create).
        $lookupsToSend = $lookups = [];
        if ($isFind) {
            switch ($moduleName) {
                case "Stone":
                    array_push($lookups, [
                        "table_name" => "preservations",
                        "column_name" => "preservation_id",
                        "display_name" => "Preservation",
                        "item_name_field" => "preservation_name",
                        "category_order" => 3,
                        "group_order" => 1]);

                    array_push($lookups, [
                        "table_name" => "stone_materials",
                        "column_name" => "material_id",
                        "display_name" => "Material",
                        "item_name_field" => "material_name",
                        "category_order" => 3,
                        "group_order" => 2]);

                    array_push($lookups, [
                        "table_name" => "stone_base_types",
                        "column_name" => "base_type_id",
                        "display_name" => "Base Typology",
                        "item_name_field" => "base_type_name",
                        "category_order" => 3,
                        "group_order" => 3]);
                    break;

                case "Lithic":
                    array_push($lookups, [
                        "table_name" => "preservations",
                        "column_name" => "preservation_id",
                        "display_name" => "Preservation",
                        "item_name_field" => "preservation_name",
                        "category_order" => 3,
                        "group_order" => 1]);

                    array_push($lookups, ["table_name" => "lithic_base_types",
                        "column_name" => "base_type_id",
                        "display_name" => "Base Typology",
                        "item_name_field" => "base_type_name",
                        "category_order" => 3,
                        "group_order" => 2]);
                    break;

                case "Glass":
                    array_push($lookups, [
                        "table_name" => "preservations",
                        "column_name" => "preservation_id",
                        "display_name" => "Preservation",
                        "item_name_field" => "preservation_name",
                        "category_order" => 3,
                        "group_order" => 1]);

                    array_push($lookups, ["table_name" => "glass_base_types",
                        "column_name" => "base_type_id",
                        "display_name" => "Base Typology",
                        "item_name_field" => "base_type_name",
                        "category_order" => 3,
                        "group_order" => 2]);
                    break;

                case "Metal":
                    array_push($lookups, [
                        "table_name" => "preservations",
                        "column_name" => "preservation_id",
                        "display_name" => "Preservation",
                        "item_name_field" => "preservation_name",
                        "category_order" => 3,
                        "group_order" => 1]);

                    array_push($lookups, ["table_name" => "metal_base_types",
                        "column_name" => "base_type_id",
                        "display_name" => "Base Typology",
                        "item_name_field" => "base_type_name",
                        "category_order" => 3,
                        "group_order" => 2]);
                    break;

                case "Pottery":
                    array_push($lookups, [
                        "table_name" => "preservations",
                        "column_name" => "preservation_id",
                        "display_name" => "Preservation",
                        "item_name_field" => "preservation_name",
                        "category_order" => 4,
                        "group_order" => 1]);

                    array_push($lookups, ["table_name" => "pottery_base_types",
                        "column_name" => "base_type_id",
                        "display_name" => "Base Partition",
                        "item_name_field" => "base_type_name",
                        "category_order" => 4,
                        "group_order" => 4]);
                    break;
            }

            //access DB and format
            foreach ($lookups as $index => $lookup) {
                $params = \DB::table($lookup["table_name"])->get();

                array_push($lookupsToSend, ["group_type" => "Lookup",
                    "group_category" => "Markers",
                    "category_order" => $lookup["category_order"],
                    "group_order" => $lookup["group_order"],
                    "column_name" => $lookup["column_name"],
                    "id" => $index, "name" => $lookup["display_name"],
                    "item_name_field" => $lookup["item_name_field"],
                    "display_name" => $lookup["display_name"],
                    'params' => $params]);
            }
        }

        //merge all filters to an array (except Area & Season modules).
        $typesAndParams = [];
        if ($addRegistrationGroups) {
            if ($isTaggable) {
                $typesAndParams = array_merge(self::$generalFilters, $tagTypes->toArray(), $lookupsToSend);
            } else {
                $typesAndParams = array_merge(self::$generalFilters, $lookupsToSend);
            }
            foreach ($typesAndParams as $index => &$localType) {
                $localType["local_type_id"] = $index;
            }
        }

        ///////////////////////
        $groups = [];
        if ($addRegistrationGroups) {
            $groups = array_merge($groups, self::$generalFilters);
        }

        if ($isTaggable) {
            $groups = array_merge($groups, $tagGroups);
        }
        if ($isFind) {
            $groups = array_merge($groups, $lookupsToSend);
        }
        ///////////////////////

        //sort array
        if ($isTaggable) {
            foreach ($groups as $key => $row) {
                $category_order[$key] = $row['category_order'];
                $group_order[$key] = $row['group_order'];
            }

            array_multisort($category_order, SORT_ASC, $group_order, SORT_ASC, $groups);

            //get rid of order columns
            foreach ($groups as $index => &$group) {
                unset($group["category_order"]);
                unset($group["group_order"]);
            }
        }

        //get counts
        $counts = [];

        if ($moduleName !== 'About') {
            $counts['items'] = $fullModelName::count();
            $counts['media'] = \DB::table('media')->where('model_type', $moduleName)->count();
        }

        if ($isFind) {
            $counts['baskets'] = \DB::table('finds')->where('findable_type', $moduleName)->whereNotNull('basket_no')->whereNull('artifact_no')->count();
            $counts['artifacts'] = \DB::table('finds')->where('findable_type', $moduleName)->whereNotNull('artifact_no')->whereNull('piece_no')->count();
            //$counts['pieces'] = \DB::table('finds')->where('findable_type', $moduleName)->whereNotNull('piece_no')->count();
        }

        $moduleData = [];
        //$mapsBaseUrl = \Storage::disk('app-media')->url($fullMediaName);
        return response()->json([
            "groups" => $groups,
            "moduleData" => [
                "counts" => $counts,
                "welcomePageParams" => WelcomePages::welcome($moduleName),
            ],
        ], 200);
    }
}
