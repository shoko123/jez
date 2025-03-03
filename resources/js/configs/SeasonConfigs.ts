import type { TModuleConfigs } from '../types/moduleTypes'

export abstract class SeasonConfigs {
  private static configs: TModuleConfigs = {
    idRegExp: /^(?<season>[2-8])$/,
    idDerived: (g: Record<string, string>) => {
      return { slug: `${Number(g.season) + 2010}`, tag: `${Number(g.season) + 2010}` }
    },
    slugRegExp: /^201(?<season>[2-8])$/,
    idFormatter: (g: Record<string, string>) => {
      return `${g.season}`
    },
    categorizerFuncs: () => {
      return {}
    },
  } as const

  public static getConfigs() {
    return SeasonConfigs.configs
  }
}
