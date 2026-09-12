import { WeUltrarichEntityBase } from '../WeUltrarichEntityBase';
import type { WeUltrarichSDK } from '../WeUltrarichSDK';
import type { Control } from '../types';
import type { Comparison, ComparisonLoadMatch } from '../WeUltrarichTypes';
declare class ComparisonEntity extends WeUltrarichEntityBase<Comparison> {
    constructor(client: WeUltrarichSDK, entopts: any);
    make(this: ComparisonEntity): ComparisonEntity;
    load(this: any, reqmatch?: ComparisonLoadMatch, ctrl?: Control): Promise<ComparisonEntity>;
}
export { ComparisonEntity };
