type TCeramic = {
  url_name: 'ceramics'
  fields: {
    id: string
    locus_id: string
    code: string
    basket_no: number
    artifact_no: number
    //
    date_retrieved: Date | string | null
    field_description: string
    field_notes: string
    //
    square: string
    level_top: string
    level_bottom: string
    //
    primary_classification_id: number
    specialist: string
    periods: string
    specialist_description: string
  }
}

export { TCeramic }
