export abstract class SeasonConfigs {
  public static getConfigs() {
    return {
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
    }
  }
}
