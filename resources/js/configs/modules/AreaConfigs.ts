import type { TModuleConfigs } from '../../types/moduleTypes'

export const AreaConfigs: TModuleConfigs = {
  idRegExp: /^(?<id>[A-Z])$/,
  slugRegExp: /^(?<id>[A-Z])$/,

  idRegExpToSlugFormatter: (g: Record<string, string>) => {
    return g.id!
  },

  slugRegExpToIdFormatter: (g: Record<string, string>) => {
    return g.id!
  },
  categorizerFuncs: () => {
    return {}
  },
  mayDelete: () => {
    return { mayDelete: false, message: 'Areas can not be deleted!' }
  },
}
