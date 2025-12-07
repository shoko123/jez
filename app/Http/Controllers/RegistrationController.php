<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\App\GetService;

class RegistrationController
{
    public function locus_finds(Request $r)
    {
        $v = $r->validate([
            'module' => 'in:Ceramic,Stone,Lithic,Metal,Glass,Fauna',
            'locus_id' => 'required|exists:loci,id',
        ]);

        $model = GetService::getModel($v['module'], true);

        $res = $model->select('id')
            ->where('locus_id', $r['locus_id'])
            ->get();

        return response()->json($res->map(function ($item) {
            return $item->id;
        }), 200);
    }
}
