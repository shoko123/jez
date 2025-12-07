import type { TModuleConfigs } from '../../types/moduleTypes'

export const LocusConfigs: TModuleConfigs = {
  idRegExp: /^(?<season>[2-8])(?<area>[K-S])(?<locus_no>\d{3})$/,
  slugRegExp: /^1(?<season>[2-8]).(?<area>[K-S]).(?<locus_no>\d{1,3})$/,

  idRegExpToSlugFormatter: (g: Record<string, string>) => {
    return `1${g.season}.${g.area}.${Number(g.locus_no)}`
  },

  slugRegExpToIdFormatter: (g: Record<string, string>) => {
    return `${g.season}${g.area}${g.locus_no!.padStart(3, '0')}`
  },
  categorizerFuncs: () => {
    return {}
  },
  mayDelete: () => {
    return { mayDelete: false, message: 'Areas can not be deleted!' }
  },
}
