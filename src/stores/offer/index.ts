import { atom, action } from "nanostores";

import { getCommercialOffers } from "@api/books";
import type { CommercialOffers } from "@schemas/CommercialOffer.type";

export const offers = atom<CommercialOffers>({
    offers: [],
});

export const getOffers = action(offers, "getOffers", async (store, keys: string[]) => {
    const data = await getCommercialOffers(keys);
    store.set(data);
    return store.get();
});
