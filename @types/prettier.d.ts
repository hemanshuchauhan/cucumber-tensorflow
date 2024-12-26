declare module 'prettier' {
    export function format(source: string, options?: any): string;
    export function resolveConfig(filePath: string): Promise<any>;
    export function getFileInfo(filePath: string, options?: any): Promise<any>;
    // You can add more functions or types as needed
}