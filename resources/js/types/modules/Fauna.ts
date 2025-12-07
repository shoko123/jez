type TFauna = {
  url_name: 'fauna'
  fields: {
    id: 'STR'
    locus_id: 'STR'
    //
    date_retrieved: 'DAT'
    weight: 'INT'
    field_description: 'STR'
    //
    primary_taxon_id: 'LV'
    scope_id: 'LV'
    material_id: 'LV'
    //

    taxa: 'STR'
    bone: 'STR'
    symmetry: 'EM'
    d_and_r: 'STR'
    age: 'STR'
    breakage: 'STR'
    butchery: 'STR'
    burning: 'STR'
    weathering: 'EM'
    other_bsm: 'STR'
    specialist_notes: 'STR'
    measured: 'STR'
  }
}

export { TFauna }
