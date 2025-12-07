import type { TModuleConfigs } from '../../types/moduleTypes'

export const SurveyConfigs: TModuleConfigs = {
  idRegExp: /^(?<area>[K-Z])(?<feature_no>\d{1,3})$/,
  slugRegExp: /^(?<area>[K-Z]).(?<feature_no>\d{1,3})$/,

  idRegExpToSlugFormatter: (g: Record<string, string>) => {
    return `${g.area}.${g.feature_no}`
  },

  slugRegExpToIdFormatter: (g: Record<string, string>) => {
    return `${g.area}${g.feature_no}`
  },
  categorizerFuncs: () => {
    return {}
  },
  mayDelete: () => {
    return { mayDelete: false, message: 'Areas can not be deleted!' }
  },
}

/*
private static configs: TModuleConfigs = {
  idRegExp: /^(?<area>[K-Z])(?<feature_no>\d{1,3})$/,
  idDerived: (g: Record<string, string>) => {
    return {
      slug: `${g.area}.${g.feature_no}`,
      tag: `${g.area}/${g.feature_no!.padStart(3, "0")}`,
    }
  },
  slugRegExp: /^(?<area>[K-Z]).(?<feature_no>\d{1,3})$/,
  idFormatter: (g: Record<string, string>) => {
    return `${g.area}${g.feature_no}`
  },
  categorizerFuncs: () => {
    return {}
  },
  mayDelete: () => {
    return { mayDelete: false }
  },
} as const

*/
