type TLocus = {
  url_name: 'loci'
  fields: {
    id: 'STR'
    season_id: 'STR'
    area_id: 'STR'
    locus_no: 'INT'
    square: 'STR'
    date_opened: 'DAT'
    date_closed: 'DAT'
    level_opened: 'STR'
    level_closed: 'STR'
    locus_above: 'STR'
    locus_below: 'STR'
    locus_co_existing: 'STR'
    description: 'STR'
    deposit: 'STR'
    registration_notes: 'STR'
    clean: 'EM'
  }
}

export { TLocus }
