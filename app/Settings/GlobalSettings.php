<?php

namespace App\Settings;

class GlobalSettings
{
    private $readOnly;
    private $loggedUsersOnly;
    
    public function __construct()
    {
        $this->readOnly = true;
        $this->loggedUsersOnly = true;
    }

    public function readOnly()
    {
        return $this->readOnly;
    }

    public function loggedUsersOnly()
    {
        return $this->loggedUsersOnly;
    }  
}