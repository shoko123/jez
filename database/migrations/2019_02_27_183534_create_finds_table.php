<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFindsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('finds', function (Blueprint $table) {
            $table->increments('id');
            //polymorphic relation to different find tables
            $table->string('findable_type', 20)->default('CHANGE_ME');
            $table->unsignedInteger('findable_id')->default(0);
            
            $table->unsignedInteger('locus_id');
            $table->string('registration_category', 2);
            $table->unsignedInteger('basket_no')->nullable();
            $table->unsignedInteger('item_no')->nullable();
            $table->unsignedInteger('related_pottery_basket')->nullable();;
            $table->date('date')->nullable();
            $table->string('description', 255)->nullable();
            $table->string('notes', 500)->nullable();
            $table->string('square', 20)->nullable();
            $table->string('periods', 100)->nullable();
            $table->boolean('keep')->nullable();
            $table->string('level_top', 20)->nullable();
            $table->string('level_bottom', 20)->nullable();
            $table->string('quantity', 10)->nullable();
            $table->unsignedInteger('weight')->nullable();
            $table->boolean('drawn')->nullable();
            $table->string('storage_location', 255)->nullable();          

            //$table->unique(['findable_type', 'registration_category', 'locus_id', 'basket_no', 'item_no'], 'unique_find_id');
            
            $table->foreign('locus_id')
                  ->references('id')->on('loci')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');

            });
            
            DB::statement('ALTER TABLE finds ADD CONSTRAINT finds_chk_registration_category CHECK (registration_category in ("AR","FL","GS", "LB", "PT"));');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('finds');
    }
}
