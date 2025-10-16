export interface TokenData {
    email: string;
    usedWords: number;
    date: string;
}
export declare function saveToken(token: string, email: string): void;
export declare function verifyToken(token: string): boolean;
export declare function addWordCount(token: string, count: number): boolean;
//# sourceMappingURL=tokenStore.d.ts.map