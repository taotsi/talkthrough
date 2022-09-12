export interface Constant {
    en: string,
    cn: string,
    route: string,
    icon?: any // should be SemanticICONS. how does it become a string?
}

export interface Constants {
    [c: string]: Constant
}