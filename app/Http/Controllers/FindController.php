<?php

namespace App\Http\Controllers;

use App\Models\Dig\Find;
use App\Models\Dig\Pottery;
use App\Models\Dig\Stone;
use Illuminate\Http\Request;

class FindController extends Controller
{
    public function index()
    {
        return Find::count();
    }

    public function destroy($id)
    {
        $find = Find::findOrFail($id);

        if ($find->delete($id)) {
            return $find;
        }
    }
}
