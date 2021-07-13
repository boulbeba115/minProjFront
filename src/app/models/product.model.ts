import { Category } from "./category.model";

export interface Product {
    id?: any;
    nom: string;
    qte: number;
    disponible: boolean;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}