<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAreasTable extends Migration
{
    public function up()
    {
        Schema::create('areas', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('year');
            $table->string('area', 5);
            $table->string('description', 500)->nullable();
            $table->string('staff', 200)->nullable();

            $table->unique(['year', 'area']);
            });

            DB::statement('ALTER TABLE areas ADD CONSTRAINT areas_chk_year CHECK (year >= 2012 AND year <= 2018);');        
            //DB::statement('ALTER TABLE votes ADD CONSTRAINT areas_unique_index CHECK UNIQUE(`year`, `area`);');
        }

    
    public function down()
    {
        Schema::dropIfExists('areas');
    }
}
