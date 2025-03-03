import type { TModuleConfigs } from '../types/moduleTypes'

export abstract class AreaConfigs {
  public static getConfigs(): TModuleConfigs {
    return {
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
    }
  }
}
