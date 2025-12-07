import type { TModuleConfigs } from '../../types/moduleTypes'

export const SeasonConfigs: TModuleConfigs = {
  idRegExp: /^(?<season>[2-8])$/,
  slugRegExp: /^201(?<season>[2-8])$/,

  idRegExpToSlugFormatter: (g: Record<string, string>) => {
    return `${Number(g.season) + 2010}`
  },

  slugRegExpToIdFormatter: (g: Record<string, string>) => {
    return g.season!
  },
  categorizerFuncs: () => {
    return {}
  },
  mayDelete: () => {
    return { mayDelete: false, message: 'Seasons can not be deleted!' }
  },
}
