<?php

namespace App\Services\App;

enum ServiceEnum
{
    case Init;
    case Read;
    case Mutate;
    case Index;
    case Page;
    case Show;
}
