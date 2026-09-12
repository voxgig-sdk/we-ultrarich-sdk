import { ComparisonEntity } from './entity/ComparisonEntity';
import { DiscoveryEntity } from './entity/DiscoveryEntity';
import { WealthExpressionEntity } from './entity/WealthExpressionEntity';
export type * from './WeUltrarichTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WeUltrarichEntityBase } from './WeUltrarichEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class WeUltrarichSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Comparison(entopts?: Record<string, any>): ComparisonEntity;
    Discovery(entopts?: Record<string, any>): DiscoveryEntity;
    WealthExpression(entopts?: Record<string, any>): WealthExpressionEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WeUltrarichSDK;
    tester(testopts?: any, sdkopts?: any): WeUltrarichSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WeUltrarichSDK;
export { stdutil, config, BaseFeature, WeUltrarichEntityBase, WeUltrarichSDK, SDK, };
