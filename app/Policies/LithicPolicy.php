<?php

namespace App\Policies;

use App\Models\Dig\Lithic;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class LithicPolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user)
    {
        return true;
    }

    public function view(?User $user, Lithic $lithic)
    {
        return true;
    }
    
    public function create(User $user)
    {
        return $user->hasPermissionTo('Lithic-create', 'api');
    }
    
    public function update(User $user, Lithic $lithic)
    {       
        return $user->hasPermissionTo('Lithic-update', 'api');
    }

    public function delete(User $user, Lithic $lithic)
    {
        return $user->hasPermissionTo('Lithic-delete', 'api');
    }
}
