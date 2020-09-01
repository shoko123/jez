<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePartitionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('partitions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('module', 20);
            $table->string('partition_name', 20);
            $table->unsignedInteger('part_id');
            $table->string('name', 20);
            $table->string('display_name', 70);
            $table->unique(['module', 'partition_name', 'part_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('partitions');
    }
}
