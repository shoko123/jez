import type { TModuleConfigs } from '../types/moduleTypes'

export abstract class SurveyConfigs {
  private static configs: TModuleConfigs = {
    idRegExp: /^(?<area>[K-Z])(?<feature_no>\d{1,3})$/,
    idDerived: (g: Record<string, string>) => {
      return {
        slug: `${g.area}.${g.feature_no}`,
        tag: `${g.area}/${g.feature_no}`,
      }
    },
    slugRegExp: /^(?<area>[K-Z]).(?<feature_no>\d{1,3})$/,
    idFormatter: (g: Record<string, string>) => {
      return `${g.area}${g.feature_no}`
    },
    categorizerFuncs: () => {
      return {}
    },
  } as const

  public static getConfigs() {
    return SurveyConfigs.configs
  }
}
