<?php

namespace App\Http\Controllers;

use App\Models\Find;

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
