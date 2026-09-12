import { Context } from './Context';
declare class WeUltrarichError extends Error {
    isWeUltrarichError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { WeUltrarichError };
