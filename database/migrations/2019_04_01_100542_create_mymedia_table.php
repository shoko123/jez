<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMymediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mymedia', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('scene_id');
            $table->unsignedInteger('media_no');
            $table->string('media_type', 1);
            $table->string('extension', 4);
            $table->date('date_taken')->nullable();

            $table->foreign('scene_id')->references('id')->on('scenes')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
        DB::statement('ALTER TABLE mymedia ADD CONSTRAINT mymedia_chk_media_type CHECK (media_type in ("P","D","L"));');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mymedia');
    }
}
