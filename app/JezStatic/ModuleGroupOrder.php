<?php

namespace App\JezStatic;

class ModuleGroupOrder
{
    private static $orders = [
        "Pottery" => [
            ["Group(s)", "Named Groups I", "Tag-Global", "Pottery:Named-Groups-I"],
            //["Group(s)", "Named Groups II", "Tag-Global", "Pottery:Named-Groups-I"],
            //["Group(s)", "Named Groups III", "Tag-Global", "Pottery:Named-Groups-I"],
            ["Ware", "Ware Coarseness", "Tag-Global", "Pottery:Ware-Coarseness"],
            ["Ware", "Ware Color", "Tag-Global", "Pottery:Ware-Color"],
            ["Ware", "Ware Temper", "Tag-Global", "Pottery:Ware-Temper"],
            ["Ware", "Grit Color", "Tag-Global", "Pottery:Ware-Grit-Color"],
            ["Basic Characteristics", "Preservation", "Lookup", "preservations", "preservation_id"],
            ["Basic Characteristics", "Life Stage", "Tag-Global", "Pottery:Life-Stage"],
            ["Basic Characteristics", "Production", "Tag-Global", "Pottery:Production"],
            ["Typology", "Base Partition", "Lookup", "pottery_base_types", "base_type_id"],
            ["Typology", "Vessel/Lid Part", "Tag-Global", "Pottery:Vessel-Part"],
            ["Typology", "Base", "Tag-Global", "Pottery:Vessel-Base-Type"],
            ["Typology", "Foot", "Tag-Global", "Pottery:Foot-Type"],
            ["Typology", "Rim", "Tag-Global", "Pottery:Rim-Type"],
            ["Typology", "Handle", "Tag-Global", "Pottery:Handle"],
            ["Typology", "Vessel Shape Typology", "Tag-Global", "Pottery:Vessel-Shape-Types"],
            ["Typology", "Ceramic Artifact Typology", "Tag-Global", "Pottery:Ceramic-Artifact"],
            ["Typology", "Architectural/Installation Typology", "Tag-Global", "Pottery:Architectural"],
            ["Surface-Treatment", "Surface", "Tag-Global", "Pottery:STF"],
            ["Surface-Treatment", "Slip Color", "Tag-Global", "Pottery:STF-Slip-Color"],
            ["Surface-Treatment", "Paint Color", "Tag-Global", "Pottery:STF-Paint-Color"],
            ["Surface-Treatment", "Paint/Slip Pattern", "Tag-Global", "Pottery:STF-Paint-Slip-Pattern"],
            ["Surface-Treatment", "Reductive/Additive", "Tag-Global", "Pottery:STRA"],
        ],

        "Stone" => [
            ["Basic Characteristics", "Preservation", "Lookup", "preservations", "preservation_id"],
            ["Basic Characteristics", "Material", "Lookup", "stone_materials", "material_id"],
            ["Basic Characteristics", "Life Stage", "Tag-Global", "Stone:Life-Stage"],
            ["Basic Characteristics", "Morphology", "Tag-Global", "Stone:Morphology"],
            ["Basic Characteristics", "Profile", "Tag-Global", "Stone:Profile"],
            ["Basic Characteristics", "Production", "Tag-Global", "Stone:Production"],
            ["Basic Characteristics", "Use Wear", "Tag-Global", "Stone:Use-Wear"],
            ["Basic Characteristics", "Base Typology", "Lookup", "stone_base_types", "base_type_id"],
            ["Typology", "Passive Subtype", "Tag-Global", "Stone:Type-Passive"],
            ["Typology", "Active Subtype", "Tag-Global", "Stone:Type-Active"],
            ["Typology", "Vessel Part", "Tag-Global", "Stone:Vessel-Part"],
            ["Typology", "Vessel Base", "Tag-Global", "Stone:Vessel-Base"],
            ["Typology", "Vessel Wall", "Tag-Global", "Stone:Vessel-Wall"],
            ["Typology", "Vessel Rim", "Tag-Global", "Stone:Vessel-Rim"],
            ["Typology", "Non-Processor Subtype", "Tag-Global", "Stone:Type-Non-Processor"]

        ],

        "Lithic" => [
            ["Basic Characteristics", "Preservation", "Lookup", "preservations", "preservation_id"],
            ["Basic Characteristics", "Base Typology", "Lookup", "lithic_base_types", "base_type_id"],
        ],

        "Metal" => [
            ["Basic Characteristics", "Preservation", "Lookup", "preservations", "preservation_id"],
            ["Basic Characteristics", "Base Typology", "Lookup", "metal_base_types", "base_type_id"],
            ["Basic Characteristics", "Material", "Lookup", "metal_materials", "material_id"],
            ["Modern Weaponry Partition", "Modern-weaponry", "Tag-Global", "Metal:Modern-Weaponry"]
        ],

        "Fauna" => [
            ["Basic Characteristics", "Preservation", "Lookup", "preservations", "preservation_id"],
            ["Basic Characteristics", "Life Stage", "Tag-Module", "Life-Stage"],
            ["Taxon", "Base Taxon", "Lookup", "fauna_taxon_L1", "taxon_L1_id"],
            ["Taxon", "Bird", "Tag-Module", "Bird"],
            ["Taxon", "Mammal", "Tag-Module", "Mammal"],
            ["Element", "Element", "Lookup", "fauna_elements_L1", "element_L1_id"],
            ["Bone", "Symmetry", "Tag-Module", "Bone-Symmetry"],
            ["Bone", "Fusion", "Tag-Module", "Bone-Fusion"],
            ["Bone", "Bone Type", "Tag-Module", "Bone-partition"],
            ["Bone", "Long Bone", "Tag-Module", "Bone-Long"],
            ["Bone", "Short Bone", "Tag-Module", "Bone-Short"],
            ["Bone", "Flat Bone", "Tag-Module", "Bone-Flat"],
            ["Bone", "Irregular Bone", "Tag-Module", "Bone-Irregular"],
            
            ["Tooth", "Tooth Name", "Tag-Module", "Tooth-Name"],
            ["Tooth", "Tooth Age", "Tag-Module", "Tooth-Age"],
            ["Tooth", "Tooth Wear", "Tag-Module", "Tooth-Wear"],

        ],

        "Glass" => [
            ["Basic Characteristics", "Preservation", "Lookup", "preservations", "preservation_id"],
            ["Basic Characteristics", "Color", "Tag-Global", "Glass:Color"],
            ["Basic Characteristics", "Weathering", "Tag-Global", "Glass:Weathering"],
            ["Basic Characteristics", "Weathering-Type", "Tag-Global", "Glass:Weathering-Type"],
            ["Basic Characteristics", "Base Typology", "Lookup", "glass_base_types", "base_type_id"],
            ["Typology", "Vessel/Lamp Subtype", "Tag-Global", "Glass:Vessel-Subtype"],
            ["Production", "Production", "Tag-Global", "Glass:Production"],
        ],
    ];

   
    public static function getOrder(String $name)
    {
        return self::$orders[$name];
    }
}
