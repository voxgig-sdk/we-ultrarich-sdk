import { WeUltrarichEntityBase } from '../WeUltrarichEntityBase';
import type { WeUltrarichSDK } from '../WeUltrarichSDK';
import type { Control } from '../types';
import type { Discovery, DiscoveryListMatch } from '../WeUltrarichTypes';
declare class DiscoveryEntity extends WeUltrarichEntityBase<Discovery> {
    constructor(client: WeUltrarichSDK, entopts: any);
    make(this: DiscoveryEntity): DiscoveryEntity;
    list(this: any, reqmatch?: DiscoveryListMatch, ctrl?: Control): Promise<DiscoveryEntity[]>;
}
export { DiscoveryEntity };
