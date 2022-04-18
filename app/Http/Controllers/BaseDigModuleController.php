<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Http\Requests\ShowRequest;
use App\Http\Requests\ChunkRequest;
use App\Models\Dig\BaseDigModel;

class BaseDigModuleController extends Controller
{
    protected $model;
    protected $modules;
    protected $baseDigModel;
    public function __construct()
    {
        $this->modules = array("About", "Area", "Season", "AreaSeason", "Locus", "Pottery", "Stone", "Lithic", "Glass", "Metal", "Flora", "Fauna", "Tbd");
        $this->baseDigModel = new BaseDigModel("hh");
    }

    public function show(ShowRequest $r)
    {
        $v = $r->validated();

        //validate that all required params are present
        $ok = false;
        switch ($v["module"]) {
            case 'About':
                if (array_key_exists('tab', $v) && array_key_exists('no', $v)) {
                    $ok = true;
                }
                break;
            case 'Area':
                if (array_key_exists('area', $v)) {
                    $ok = true;
                }
                break;
            case 'Season':
                if (array_key_exists('season', $v)) {
                    $ok = true;
                }
                break;
            case 'AreaSeason':
                if (array_key_exists('area', $v) && array_key_exists('season', $v)) {
                    $ok = true;
                }
                break;

            case 'Locus':
                if (array_key_exists('area', $v) && array_key_exists('season', $v) && array_key_exists('locus_no', $v)) {
                    $ok = true;
                }
                break;

            case 'Pottery':
            case 'Stone':
            case 'Lithic':
            case 'Metal':
            case 'Glass':
            case 'Flora':
            case 'Fauna':
            case 'Tbd':
                if (
                    array_key_exists('area', $v) &&
                    array_key_exists('season', $v) &&
                    array_key_exists('locus_no', $v) &&
                    array_key_exists('registration_category', $v) &&
                    array_key_exists('basket_no', $v) &&
                    array_key_exists('artifact_no', $v)
                ) {
                    $ok = true;
                }
                break;
        }
        if (!$ok) {
            return $this->invalidArgumentsError("request argument(s) missing");
        }


        $modelName = "App\Models\Dig\\" . $v["module"];
        $model =  new $modelName;
        $ids = $model->getIdsFromParams($v);
        if (is_null($ids)) {
            return $this->itemNotFoundError($v["module"] . " item not found!");
        }
        $params = (array)$v;
        $merged = array_merge($params, $ids);
        

        //$item = $model->show(2);
        return response(
            $model->show($merged),
            200
        );
    }

    public function chunk(ChunkRequest $r)
    {
        return response()->json([
            "collection" => $this->baseDigModel->chunk($r),
        ], 200);
    }

    protected function invalidArgumentsError($message)
    {
        return response()->json([
            'message' => $message
        ], 400);
    }

    protected function itemNotFoundError($message)
    {
        return response()->json([
            'message' => $message
        ], 401);
    }




    protected function parseLocus($module, $dot)
    {
    }
    protected function parseFind($module, $dot)
    {
    }
}
