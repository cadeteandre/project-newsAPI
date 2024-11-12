export interface INews {
    status:       string;
    totalResults: number;
    articles:     IArticle[];
}

export interface IArticle {
    source:      ISource;
    author:      string;
    title:       string;
    description: string;
    url:         string;
    urlToImage:  null | string;
    publishedAt: Date;
    content:     string;
}

export interface ISource {
    id:   IID | null;
    name: string;
}

export enum IID {
    BusinessInsider = "business-insider",
    DieZeit = "die-zeit",
    LEMonde = "le-monde",
    NewScientist = "new-scientist",
}
