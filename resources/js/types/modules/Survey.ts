type TSurvey = {
  url_name: 'survey'
  fields: {
    id: string
    area_id: string
    feature_no: number
    surveyed_date: string | null
    elevation: number
    next_to: string
    description: string
    notes: string
  }
  apiTabularPageFields: 'id' | 'Surveyed Date' | 'Elevation' | 'Description' | 'Notes'
}

export { TSurvey }
