import type { TModuleConfigs } from '../types/moduleTypes'

export abstract class AreaConfigs {
  private static configs: TModuleConfigs = {
    idRegExp: /^(?<area>[K-S])$/,
    slugRegExp: /^(?<area>[K-S])$/,

    idDerived: (g: Record<string, string>) => {
      return { slug: `${g.area}`, tag: `${g.area}` }
    },

    idFormatter: (g: Record<string, string>) => {
      return `${g.area}`
    },
    categorizerFuncs: () => {
      return {}
    },
    mayDelete: () => {
      return { mayDelete: false, message: 'Areas can not be deleted!' }
    },
  } as const

  public static getConfigs() {
    return AreaConfigs.configs
  }
}
