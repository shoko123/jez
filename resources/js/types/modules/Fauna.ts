type TFauna = {
  url_name: 'fauna'
  fields: {
    id: string
    locus_id: string
    code: string
    basket_no: number
    artifact_no: number
    //
    date_retrieved: string | null
    weight: number
    field_description: string
    //
    primary_taxon_id: number
    scope_id: number
    material_id: number
    //

    taxa: string
    bone: string
    symmetry: string
    d_and_r: string
    age: string
    breakage: string
    butchery: string
    burning: string
    weathering: string
    other_bsm: string
    specialist_notes: string
    measured: string
  }
}

export { TFauna }
