<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\User;

class AuthController extends BaseController
{
    public function me()
    {
        $user = Auth::user();
        $me = User::findOrFail($user->id);

        return response()->json([
            'name' => $user->name,
            'id' => $user->id,
            'is_verified' => ! ($user->email_verified_at === null),
            'permissions' => $me->getAllPermissions()->pluck('name'),
        ], 200);
    }
}
