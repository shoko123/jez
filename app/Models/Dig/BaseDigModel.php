<?php

namespace App\Models\Dig;

use App\Traits\MediaTrait;
use App\Traits\RegistrationTagTrait;
use App\Traits\FilterTrait;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Tags\HasTags;

class BaseDigModel extends Model implements HasMedia
{
    use HasTags, InteractsWithMedia, MediaTrait/*, RegistrationTagTrait*/;
    public $timestamps = false;
    protected $guarded = [];
    protected $eloquent_model_name;

    public function __construct(string $eloquent_model_name)
    {
        $this->eloquent_model_name = $eloquent_model_name;
    }

    public function registerMediaConversions(Media $media = null): void
    {
        $this->addMediaConversion('tn')
            ->width(250)
            ->height(250)
            ->sharpen(10)
            ->nonQueued();
    }

   

    public function formatCollection(Collection $collection)
    {
        $c = $collection;
        foreach ($c as $index => $item) {
            $item = $this->formatCollectionItem($item);
        }
        return $c;
    }

    public function formatCollectionItem(Object $item)
    {
        $media = $this->primaryMedia($this->eloquent_model_name, $item);
        $item["fullUrl"] = $media->fullUrl;
        $item["hasMedia"] = $media->hasMedia;
        $item["tnUrl"] = $media->tnUrl;
        $item["tag"] = $this->getItemTag($this->eloquent_model_name, $item);
        unset($item->media);
        return $item;
    }

    protected function getItemTag(string $eloquent_model_name, Object $item)
    {
        switch ($eloquent_model_name) {
            case "Area":
                return $item->name;
            case "Season":
                return $item->season + 2000;

            case "AreaSeason":
                return $item->tag;
            case "Locus":
                return $item->tag . '/' . $item->locus_no;
            case "Pottery":
            case "Stone":
            case "Lithic":
            case "Metal":
            case "Glass":
            case "Flora":
            case "Fauna":
            case "Tbd":
                return getFindTag($item);
                return "****";

        }
    }
    
    public function formatItem(array $item)
    {
        foreach ($collection as $index => $item) {
            $media = $this->primaryMedia('Season', $item);
            $item["fullUrl"] = $media->fullUrl;
            $item["hasMedia"] = $media->hasMedia;
            $item["tnUrl"] = $media->tnUrl;
            $item["tag"] = $item->name;
            unset($item->media);
        }
    }

    //format find's tag. relies only on the $find builder result parameter 
    public function getFindTag($find)
    {
        $tag = "";
        if (isset($find->locus)) {
            $tag = $find->locus->areaSeason->tag . '/' . $find->locus->locus_no . '.' . $find->registration_category;
        } else {
            $tag = $find->tag . '/' . $find->locus_no . '.' . $find->registration_category;
        }
        if ($find->registration_category == 'AR') {
            $tag .= $find->basket_no . "." . $find->artifact_no;
            if ($find->piece_no !== 0) {

                $tag .= "P" . $find->piece_no;
            }
        } else {
            //format basket.artifact.piece
            if ($find->basket_no !== 0) {
                $tag .= $find->basket_no;
            }
            if ($find->artifact_no !== 0) {
                if ($find->basket_no !== 0) {
                    $tag .= ".";
                }
                $tag .= $find->artifact_no;
            }
            if ($find->piece_no !== 0) {
                if ($find->artifact_no !== 0) {
                    $tag .= ".";
                }
                $tag .= "P" . $find->piece_no;
            }
        }
        return $tag;
    }
}
