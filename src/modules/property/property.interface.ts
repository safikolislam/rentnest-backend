export interface PropertyPayload {
    title:string;
    description:string;
    location:string;
    price:number;
    amenities:string[];
    images:string[];
    categoryId:string;
}

export interface PropertyPayload {
    title: string;
    description: string;
    location: string;
    price: number;
    amenities: string[];
    images: string[];
    categoryId: string;
}

export interface PropertyFilters {
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    categoryId?: string;
    amenities?: string;
}