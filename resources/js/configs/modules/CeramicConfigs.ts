import type { TModuleConfigs, TFields } from '../../types/moduleTypes'

export const CeramicConfigs: TModuleConfigs = {
  idRegExp:
    /^(?<season>[2-8])(?<area>[K-S])(?<locus_no>\d{3})(?<code>[A-Z]{2})(?<basket_no>\d{2})(?<artifact_no>\d{2})$/,

  idRegExpToSlugFormatter: (g: Record<string, string>) => {
    return `1${g.season}.${g.area}.${+g.locus_no!}.${g.code}.${+g.basket_no!}.${+g.artifact_no!}`
  },

  slugRegExp:
    /^1(?<season>[2-8]).(?<area>[K-S]).(?<locus_no>\d{1,3}).(?<code>[A-Z]{2}).(?<basket_no>\d{1,2}).(?<artifact_no>\d{1,2})$/,

  slugRegExpToIdFormatter: (g: Record<string, string>) => {
    return `${g.season}${g.area}${g.locus_no!.padStart(3, '0')}${g.code}${g.basket_no!.padStart(2, '0')}${g.artifact_no!.padStart(2, '0')}`
  },

  categorizerFuncs: (fields?: TFields) => {
    const d = fields as TFields<'Ceramic'>
    return {
      'Registration Scope': d.id.substring(9) === '00' ? 0 : 1,
    }
  },
  mayDelete: () => {
    return { mayDelete: false, message: 'Ceramic items can not be deleted!' }
  },
}
