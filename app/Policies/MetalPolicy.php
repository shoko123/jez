<?php

namespace App\Policies;

use App\Models\Dig\Metal;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class MetalPolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user)
    {
        return true;
    }

    public function view(?User $user, Metal $metal)
    {
        return true;
    }
    
    public function create(User $user)
    {
        return $user->hasPermissionTo('Metal-create', 'api');
    }
    
    public function update(User $user, Metal $metal)
    {       
        return $user->hasPermissionTo('Metal-update', 'api');
    }

    public function delete(User $user, Metal $metal)
    {
        return $user->hasPermissionTo('Metal-delete', 'api');
    }
}
