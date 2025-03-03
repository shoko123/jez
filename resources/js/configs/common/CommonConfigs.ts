import type { TModuleConfigs } from '../../types/moduleTypes'

export class CommonConfigs {
  private static configs: TModuleConfigs = {
    idRegExp:
      /^(?<season>[2-8])(?<area>[K-S])(?<locus_no>\d{3})(?<code>[A-Z]{2})(?<basket_no>\d{2})(?<artifact_no>\d{2})$/,
    slugRegExp:
      /^1(?<season>[2-8]).(?<area>[K-S]).(?<locus_no>\d{1,3}).(?<code>[A-Z]{2}).(?<basket_no>\d{1,2}).(?<artifact_no>\d{1,2})$/,
    idFormatter: (g: Record<string, string>) =>
      `${g.season}${g.area}${g.locus_no!.padStart(3, '0')}${g.code}${g.basket_no!.padStart(2, '0')}${g.artifact_no!.padStart(2, '0')}`,

    idDerived: (g: Record<string, string>) => {
      return {
        slug: `1${g.season}.${g.area}.${Number(g.locus_no)}.${g.code}.${Number(g.basket_no)}.${Number(g.artifact_no)}`,
        tag: `1${g.season}/${g.area}/${Number(g.locus_no)}.${g.code}.${Number(g.basket_no)}.${Number(g.artifact_no)}`,
      }
    },
  }

  public static getConfigs(): TModuleConfigs {
    return CommonConfigs.configs
  }
}
