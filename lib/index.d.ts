export declare const capitalizeFirstLetter: (str: string) => string;
export declare const capitalizeAllFirstLetters: (str: string) => string;
export declare const delay: (timeout: number) => Promise<void>;
export declare const kebabCaseToCamelCase: (str: string) => string;
type Data = {
    id: string;
    updatedAt?: string;
};
export declare const isDataNewer: <S extends Data>(existingData: S, newData: S) => boolean;
export declare const isDateValid: (dateString: string) => boolean;
export declare const mergeData: <S extends Data>(existingData: S[], newData: S | S[]) => S[];
export declare const removeData: <S extends {
    id: string;
}>(existingData: S[], newData: S | S[]) => S[];
export {};
