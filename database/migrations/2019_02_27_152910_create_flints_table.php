<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFlintsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flints', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('weight')->nullable();
            $table->string('description', 100)->nullable();
            $table->string('notes', 100)->nullable();
            $table->string('type')->default('some flint');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flints');
    }
}
