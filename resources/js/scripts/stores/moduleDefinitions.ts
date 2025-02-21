import type { TFields, TModuleDefinitionImplementation } from '../../types/moduleTypes'

const smallFindsCommon = {
  idRegExp:
    /^(?<season>[2-8])(?<area>[K-S])(?<locus_no>\d{3})(?<code>[A-Z]{2})(?<basket_no>\d{2})(?<artifact_no>\d{2})$/,

  idDerived: (g: Record<string, string>) => {
    return {
      slug: `1${g.season}.${g.area}.${Number(g.locus_no)}.${g.code}.${Number(g.basket_no)}.${Number(g.artifact_no)}`,
      tag: `1${g.season}/${g.area}/${Number(g.locus_no)}.${g.code}.${Number(g.basket_no)}.${Number(g.artifact_no)}`,
    }
  },

  slugRegExp:
    /^1(?<season>[2-8]).(?<area>[K-S]).(?<locus_no>\d{1,3}).(?<code>[A-Z]{2}).(?<basket_no>\d{1,2}).(?<artifact_no>\d{1,2})$/,

  idFormatter: (g: Record<string, string>) => {
    return `${g.season}${g.area}${g.locus_no!.padStart(3, '0')}${g.code}${g.basket_no!.padStart(2, '0')}${g.artifact_no!.padStart(2, '0')}`
  },
}

const moduleDefinitions: TModuleDefinitionImplementation = {
  Season: {
    idRegExp: /^(?<season>[2-8])$/,
    idDerived: (g: Record<string, string>) => {
      return { slug: `${Number(g.season) + 2010}`, tag: `${Number(g.season) + 2010}` }
    },
    slugRegExp: /^201(?<season>[2-8])$/,
    idFormatter: (g: Record<string, string>) => {
      return `${g.season}`
    },
  },
  Area: {
    idRegExp: /^(?<area>[K-S])$/,
    idDerived: (g: Record<string, string>) => {
      return { slug: `${g.area}`, tag: `${g.area}` }
    },
    slugRegExp: /^(?<area>[K-S])$/,
    idFormatter: (g: Record<string, string>) => {
      return `${g.area}`
    },
  },
  Survey: {
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
  },
  Locus: {
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
  },
  Ceramic: {
    idRegExp: smallFindsCommon.idRegExp,
    idDerived: smallFindsCommon.idDerived,
    slugRegExp: smallFindsCommon.slugRegExp,
    idFormatter: smallFindsCommon.idFormatter,
    categorizerFunc: (fields) => {
      const d = fields as TFields<'Ceramic'>
      return {
        'Registration Scope': d.artifact_no === 0 ? 0 : 1,
        'Includes Date': d.date_retrieved === null ? 1 : 0,
      }
    },
  },
  Fauna: {
    idRegExp: smallFindsCommon.idRegExp,
    idDerived: smallFindsCommon.idDerived,
    slugRegExp: smallFindsCommon.slugRegExp,
    idFormatter: smallFindsCommon.idFormatter,
    categorizerFunc: (fields) => {
      const d = fields as TFields<'Fauna'>
      return {
        'Registration Scope': d.artifact_no === 0 ? 0 : 1,
      }
    },
  },
  Glass: {
    idRegExp: smallFindsCommon.idRegExp,
    idDerived: smallFindsCommon.idDerived,
    slugRegExp: smallFindsCommon.slugRegExp,
    idFormatter: smallFindsCommon.idFormatter,
  },
  Lithic: {
    idRegExp: smallFindsCommon.idRegExp,
    idDerived: smallFindsCommon.idDerived,
    slugRegExp: smallFindsCommon.slugRegExp,
    idFormatter: smallFindsCommon.idFormatter,
    categorizerFunc: (fields) => {
      const d = fields as TFields<'Lithic'>
      return {
        'Registration Scope': d.artifact_no === 0 ? 0 : 1,
      }
    },
  },
  Metal: {
    idRegExp: smallFindsCommon.idRegExp,
    idDerived: smallFindsCommon.idDerived,
    slugRegExp: smallFindsCommon.slugRegExp,
    idFormatter: smallFindsCommon.idFormatter,
  },
  Stone: {
    idRegExp: smallFindsCommon.idRegExp,
    idDerived: smallFindsCommon.idDerived,
    slugRegExp: smallFindsCommon.slugRegExp,
    idFormatter: smallFindsCommon.idFormatter,
  },
}

export { moduleDefinitions }
