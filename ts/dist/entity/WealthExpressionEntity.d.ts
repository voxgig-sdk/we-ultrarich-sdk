import { WeUltrarichEntityBase } from '../WeUltrarichEntityBase';
import type { WeUltrarichSDK } from '../WeUltrarichSDK';
import type { Control } from '../types';
import type { WealthExpression, WealthExpressionLoadMatch } from '../WeUltrarichTypes';
declare class WealthExpressionEntity extends WeUltrarichEntityBase<WealthExpression> {
    constructor(client: WeUltrarichSDK, entopts: any);
    make(this: WealthExpressionEntity): WealthExpressionEntity;
    load(this: any, reqmatch?: WealthExpressionLoadMatch, ctrl?: Control): Promise<WealthExpressionEntity>;
}
export { WealthExpressionEntity };
