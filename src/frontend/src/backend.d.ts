import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Item {
    id: bigint;
    existentialPrice: string;
    name: string;
    shortDescription: string;
    category: Category;
    longDescription: string;
}
export interface JournalEntry {
    id: bigint;
    title: string;
    content: string;
    themeTag: string;
    excerpt: string;
}
export enum Category {
    personality = "personality",
    desire = "desire",
    dream = "dream"
}
export interface backendInterface {
    getAllItems(): Promise<Array<Item>>;
    getAllJournalEntries(): Promise<Array<JournalEntry>>;
    getItemById(id: bigint): Promise<Item>;
    getItemsByCategory(category: Category): Promise<Array<Item>>;
    getJournalEntryById(id: bigint): Promise<JournalEntry>;
}
