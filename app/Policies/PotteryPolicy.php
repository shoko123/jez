<?php

namespace App\Policies;

use App\Models\Dig\Pottery;
use App\Models\Auth\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PotteryPolicy
{
    use HandlesAuthorization;

    public function viewAny(?User $user)
    {
        return true;
    }

    public function view(?User $user, Pottery $pottery)
    {
        return true;
    }
    
    public function create(User $user)
    {
        return $user->hasPermissionTo('Pottery-create', 'api');
    }
    
    public function update(User $user, Pottery $pottery)
    {       
        return $user->hasPermissionTo('Pottery-update', 'api');
    }

    public function delete(User $user, Pottery $pottery)
    {
        return $user->hasPermissionTo('Pottery-delete', 'api');
    }
}
