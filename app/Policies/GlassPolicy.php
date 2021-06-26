<?php

namespace App\Policies;

use App\Models\Dig\Glass;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class GlassPolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user)
    {
        return true;
    }

    public function view(?User $user, Glass $glass)
    {
        return true;
    }
    
    public function create(User $user)
    {
        return $user->hasPermissionTo('Glass-create', 'api');
    }
    
    public function update(User $user, Glass $glass)
    {       
        return $user->hasPermissionTo('Glass-update', 'api');
    }

    public function delete(User $user, Glass $glass)
    {
        return $user->hasPermissionTo('Glass-delete', 'api');
    }
}
