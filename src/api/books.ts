import type { Book } from "@schemas/Book.type";
import type { CommercialOffers } from "@schemas/CommercialOffer.type";

export async function getAllBooks(searchTerm?: string | null): Promise<Book[]> {
    const response = await fetch(`${import.meta.env.PUBLIC_API}/books`);

    if (searchTerm) {
        const data = await response.json();

        return data.filter((book: Book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    return response.json();
}

export async function getCommercialOffers(ids: string[]): Promise<CommercialOffers> {
    const response = await fetch(`${import.meta.env.PUBLIC_API}/books/${ids.join(',')}/commercialOffers`);
    
    return response.json();
} 