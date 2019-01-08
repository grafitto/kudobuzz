export interface IAggregate {
    types: ITypeAggregate,
    sources: ISourceAggregate
}

interface ITypeAggregate {
    product: IProductAggregate,
    site: ISiteAggregate
}

interface ISourceAggregate {
    amazon: IAmazonAggregate,
    facebook: IFacebookAggregate
}

interface IProductAggregate extends IAtomAggregate{}

interface ISiteAggregate extends IAtomAggregate{}

interface IAmazonAggregate extends IAtomAggregate{}

interface IFacebookAggregate extends IAtomAggregate{}

interface IAtomAggregate {
    count: number,
    percentage: number
}