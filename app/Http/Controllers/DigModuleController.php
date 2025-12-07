<?php

namespace App\Http\Controllers;

use App\Services\App\ServiceEnum;
use App\Http\Requests\Module\IndexRequest;
use App\Http\Requests\Module\DestroyRequest;
use App\Http\Requests\Module\ItemByIdRequest;
use App\Http\Requests\ModuleRequest;
use App\Http\Requests\Module\StoreRequest;

class DigModuleController extends BaseController
{
    /**
     * Get the module's init data (counts, trio, description_text)
     */
    public function init(ModuleRequest $r)
    {
        $v = $r->validated();
        $service = static::makeDigModuleService(ServiceEnum::Init, $v['module']);

        return response()->json($service->init(), 200);
    }

    /**
     * Filter the module's table and return an array of ids.
     */
    public function index(IndexRequest $r)
    {
        $v = $r->validated();
        $service = static::makeDigModuleService(ServiceEnum::Index, $v['module']);

        return response()->json($service->index($v['query'] ?? null), 200);
    }

    /**
     * Retrieve a single record and related data.
     */
    public function show(ItemByIdRequest $r)
    {
        $v = $r->validated();
        $service = static::makeDigModuleService(ServiceEnum::Show, $v['module']);

        return response()->json($service->show($v['id'], $v['relatedPageView'], $v['relatedPageLength'], $v['mediaPageLength']), 200);
    }

    /**
     * Create/update a Module record.
     */
    public function store(StoreRequest $r)
    {
        $v = $r->validated();
        $mutateService = static::makeDigModuleService(ServiceEnum::Mutate, $v['module']);
        if ($r->isMethod('post')) {
            return response()->json($mutateService->create($v['data']), 201);
        }
        return response()->json($mutateService->update($v['data']), 200);
    }

    public function destroy(DestroyRequest $r)
    {
        $v = $r->validated();
        $mutateService = static::makeDigModuleService(ServiceEnum::Mutate, $r['module']);

        return response()->json($mutateService->destroy($v['module'], $v['id']), 200);
    }
}
