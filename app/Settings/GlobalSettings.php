<?php

namespace App\Settings;

class GlobalSettings
{
    private $readOnly;
    private $loggedUsersOnly;

    public function __construct()
    {
        $this->readOnly = false;
        $this->loggedUsersOnly = true;
    }

    public function get()
    {
        return (object) [
            "readOnly" => $this->readOnly,
            "loggedUsersOnly" => $this->loggedUsersOnly,
        ];
    }

    public function set($payload)
    {
        if (property_exists($payload, 'readOnly')) {
            $this->readOnly = $payload->readOnly;
        }
        if (property_exists($payload, 'loggedUsersOnly')) {
            $this->loggedUsersOnly = $payload->loggedUsersOnly;
        }

        return response()->json([
            "readOnly" => $this->readOnly,
            "loggedUsersOnly" => $this->loggedUsersOnly,
        ], 200);
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
