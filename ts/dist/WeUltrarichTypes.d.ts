export interface Comparison {
    expression: string;
    ratio: Record<string, any>;
    resultTheirs: Record<string, any>;
    resultYours: Record<string, any>;
}
export interface ComparisonLoadMatch {
    expression: string;
    frequency?: string;
    period?: number;
    rate?: number;
    spend?: any;
    type_of_item?: string;
    type_of_money?: string;
    wealth_their: any;
    wealth_your: any;
}
export interface Discovery {
    route: string;
}
export interface DiscoveryListMatch {
    route?: string;
}
export interface WealthExpression {
    phrase: string;
    scale: string;
    sentence: string;
    type: string;
    unit: string;
    value: number;
}
export interface WealthExpressionLoadMatch {
    frequency?: string;
    period?: number;
    rate?: number;
    wealth: any;
    spend?: any;
    type_of_item?: string;
    type_of_money?: string;
}
