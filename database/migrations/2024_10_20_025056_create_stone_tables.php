<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stone_primary_classifications', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('stone_materials', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 50);
        });

        Schema::create('stones', function (Blueprint $table) {
            $table->string('id', 11)->primary();
            $table->string('locus_id', 5);
            $table->date('date_retrieved')->nullable();
            $table->string('field_description', 400)->nullable();
            $table->string('field_notes', 400)->nullable();
            $table->string('artifact_count', 10)->nullable();
            $table->string('square', 20)->nullable();
            $table->string('level_top', 20)->nullable();
            $table->string('level_bottom', 20)->nullable();
            $table->unsignedInteger('primary_classification_id')->default(1);
            $table->unsignedInteger('material_id')->default(1);
            $table->string('description', 400)->nullable();
            $table->string('notes', 400)->nullable();
            //
            $table->foreign('locus_id')
                ->references('id')->on('loci')
                ->onUpdate('cascade');

            //by default delete of row in parent table is rejected if any refernece exists.
            $table->foreign('primary_classification_id')
                ->references('id')->on('stone_primary_classifications')
                ->onUpdate('cascade');

            $table->foreign('material_id')
                ->references('id')->on('stone_materials')
                ->onUpdate('cascade');
        });

        Schema::create('stone_tag_groups', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 40);
            $table->boolean('multiple')->default(0);
        });

        Schema::create('stone_tags', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->string('name', 50);
            $table->unsignedTinyInteger('tag_group_id');
            $table->unsignedSmallInteger('order_column');

            $table->foreign('tag_group_id')
                ->references('id')
                ->on('stone_tag_groups')
                ->onUpdate('cascade');
        });

        Schema::create('stone-stone_tags', function (Blueprint $table) {
            $table->string('item_id', 11);
            $table->foreign('item_id')->references('id')->on('stones')->onUpdate('cascade');

            $table->unsignedSmallInteger('tag_id')->unsigned();
            $table->foreign('tag_id')->references('id')->on('stone_tags')->onUpdate('cascade');

            $table->primary(['item_id', 'tag_id']);
        });

        Schema::create('stone_onps', function (Blueprint $table) {
            $table->smallIncrements('id');
            $table->enum('group_label', ['General Measurements', 'Perforation Measurements', 'Base Measurements', 'Rim Measurements']);
            $table->string('label', 50);
            $table->string('unit_label', 10)->nullable();
            $table->unsignedTinyInteger('order_column');
            $table->unsignedTinyInteger('shift');
            $table->unsignedSmallInteger('min');
            $table->unsignedSmallInteger('max');
            //
            $table->unique(['group_label', 'label']);
        });

        Schema::create('stone-stone_onps', function (Blueprint $table) {
            $table->string('item_id', 11);
            $table->unsignedSmallInteger('onp_id');
            $table->unsignedSmallInteger('value');

            $table->foreign('onp_id')->references('id')->on('stone_onps')->onUpdate('cascade');
            $table->foreign('item_id')->references('id')->on('stones')->onUpdate('cascade');
            $table->primary(['item_id', 'onp_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //drop dependant tables first to avoid fk violations. 
        Schema::dropIfExists('stone_materials');
        Schema::dropIfExists('stone_primary_classifications');
        Schema::dropIfExists('stones');
    }
};
