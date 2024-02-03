export declare const capitalizeFirstLetter: (str: string) => string;
export declare const capitalizeAllFirstLetters: (str: string) => string;
export declare const compareTimeWithCurrent: (time: string) => 'before' | 'after' | 'invalid input';
export declare const delay: (timeout: number) => Promise<void>;
export declare const hasDuplicates: (array: Record<string, any>[], propertyName: string) => boolean;
export declare const kebabCaseToCamelCase: (str: string) => string;
type Data = {
    id: string | number;
    updatedAt?: string;
};
export declare const isDataNewer: <S extends Data>(existingData: S, newData: S) => boolean;
export declare const isDateValid: (dateString: string) => boolean;
interface IsValidWebUrlOptions {
    requireProtocol?: boolean;
}
export declare const isValidWebUrl: (urlString: string, options?: IsValidWebUrlOptions) => boolean;
export declare const mergeData: <S extends Data>(existingData: S[], newData: S | S[]) => S[];
export declare const removeData: <S extends Data>(existingData: S[], newData: S | S[]) => S[];
export {};
