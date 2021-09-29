<?php

namespace App\Settings;

class GlobalSettings
{
    private $readOnly;
    private $authorizedUsersOnly;

    public function __construct()
    {
        $this->readOnly = false;
        $this->authorizedUsersOnly = true;
    }

    public function get()
    {
        return (object) [
            "readOnly" => $this->readOnly,
            "authorizedUsersOnly" => $this->authorizedUsersOnly,
        ];
    }

    public function set($payload)
    {
        if (property_exists($payload, 'readOnly')) {
            $this->readOnly = $payload->readOnly;
        }
        if (property_exists($payload, 'authorizedUsersOnly')) {
            $this->authorizedUsersOnly = $payload->authorizedUsersOnly;
        }

        return (object)[
            "readOnly" => $this->readOnly,
            "authorizedUsersOnly" => $this->authorizedUsersOnly,
        ];
    }

    public function readOnly()
    {
        return $this->readOnly;
    }

    public function authorizedUsersOnly()
    {
        return $this->authorizedUsersOnly;
    }
}
