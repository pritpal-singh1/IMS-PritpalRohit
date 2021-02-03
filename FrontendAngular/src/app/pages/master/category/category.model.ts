// Table data
export interface Table {
    id: string;
    name: string;
    office: string;
    // age: number;
    // date: string;
    // salary: string;
    // unit: number;
    // enddate: string;
}

// Search Data
export interface SearchResult {
    tables: Table[];
    total: number;
}
