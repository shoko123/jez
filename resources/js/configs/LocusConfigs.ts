import type { TModuleConfigs } from '../types/moduleTypes'

export abstract class LocusConfigs {
  private static configs: TModuleConfigs = {
    idRegExp: /^(?<season>[2-8])(?<area>[K-S])(?<locus_no>\d{3})$/,
    idDerived: (g: Record<string, string>) => {
      return {
        slug: `1${g.season}.${g.area}.${Number(g.locus_no)}`,
        tag: `1${g.season}/${g.area}/${Number(g.locus_no)}`,
      }
    },
    slugRegExp: /^1(?<season>[2-8]).(?<area>[K-S]).(?<locus_no>\d{1,3})$/,
    idFormatter: (g: Record<string, string>) => {
      return `${g.season}${g.area}${g.locus_no!.padStart(3, '0')}`
    },
    categorizerFuncs: () => {
      return {}
    },
  } as const

  public static getConfigs() {
    return LocusConfigs.configs
  }
}
