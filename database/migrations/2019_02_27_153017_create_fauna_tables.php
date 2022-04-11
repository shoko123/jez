<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFaunaTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fauna_taxon_L1', function (Blueprint $table) {
            $table->tinyIncrements('id');
            $table->string('name', 50);
        });

        Schema::create('fauna_elements_L1', function (Blueprint $table) {
            $table->tinyincrements('id');
            $table->string('name', 50);
        });

        Schema::create('fauna', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description', 400)->nullable();
            $table->string('notes', 200)->nullable();
            $table->unsignedTinyInteger('taxon_L1_id')->dafault(1);
            $table->unsignedTinyInteger('element_L1_id')->dafault(1);
            $table->boolean('has_butchery_evidence')->default(false);
            $table->boolean('has_burning_evidence')->default(false);
            $table->boolean('has_other_bsm_evidence')->default(false);
            $table->boolean('is_fused')->nullable();
            $table->boolean('is_left')->nullable();
            $table->string('d_and_r', 50)->nullable();
            $table->unsignedTinyInteger('weathering')->nullable();
            $table->string('age', 50)->nullable();
            $table->string('breakage', 50)->nullable();

            $table->unsignedDecimal('GL', 4, 1)->nullable();
            $table->unsignedDecimal('Glpe', 4, 1)->nullable();
            $table->unsignedDecimal('GLl', 4, 1)->nullable();
            $table->unsignedDecimal('GLP', 4, 1)->nullable();
            $table->unsignedDecimal('Bd', 4, 1)->nullable();
            $table->unsignedDecimal('BT', 4, 1)->nullable();
            $table->unsignedDecimal('Dd', 4, 1)->nullable();
            $table->unsignedDecimal('BFd', 4, 1)->nullable();
            $table->unsignedDecimal('Bp', 4, 1)->nullable();
            $table->unsignedDecimal('Dp', 4, 1)->nullable();
            $table->unsignedDecimal('SD', 4, 1)->nullable();
            $table->unsignedDecimal('HTC', 4, 1)->nullable();
            $table->unsignedDecimal('Dl', 4, 1)->nullable();
            $table->unsignedDecimal('DEM', 4, 1)->nullable();
            $table->unsignedDecimal('DVM', 4, 1)->nullable();
            $table->unsignedDecimal('WCM', 4, 1)->nullable();
            $table->unsignedDecimal('DEL', 4, 1)->nullable();
            $table->unsignedDecimal('DVL', 4, 1)->nullable();
            $table->unsignedDecimal('WCL', 4, 1)->nullable();
            $table->unsignedDecimal('LD', 4, 1)->nullable();
            $table->unsignedDecimal('DLS', 4, 1)->nullable();
            $table->unsignedDecimal('LG', 4, 1)->nullable();
            $table->unsignedDecimal('BG', 4, 1)->nullable();
            $table->unsignedDecimal('DID', 4, 1)->nullable();
            $table->unsignedDecimal('BFcr', 4, 1)->nullable();
            $table->unsignedDecimal('GD', 4, 1)->nullable();
            $table->unsignedDecimal('GB', 4, 1)->nullable();
            $table->unsignedDecimal('BF', 4, 1)->nullable();
            $table->unsignedDecimal('LF', 4, 1)->nullable();
            $table->unsignedDecimal('GLm', 4, 1)->nullable();
            $table->unsignedDecimal('GH', 4, 1)->nullable();

            $table->foreign('taxon_L1_id')
                ->references('id')->on('fauna_taxon_L1')
                ->onUpdate('cascade');

            $table->foreign('element_L1_id')
                ->references('id')->on('fauna_elements_L1')
                ->onUpdate('cascade');
        });
        /*
        Schema::create('fauna', function (Blueprint $table) {
            $table->increments('id');
            $table->string('quantity', 60)->nullable();
  
            $table->string('notes', 100)->nullable();
            $table->unsignedTinyInteger('taxon_L1_id')->dafault(1);
            $table->unsignedTinyInteger('element_L1_id')->dafault(1);

            $table->foreign('taxon_L1_id')
                ->references('id')->on('fauna_taxon_L1')
                ->onUpdate('cascade');

            $table->foreign('element_L1_id')
                ->references('id')->on('fauna_elements_L1')
                ->onUpdate('cascade');
        });
        */
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fauna_base_types');
        Schema::dropIfExists('fauna');
    }
}
