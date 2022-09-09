export type Offer = "percentage" | "minus" | "slice";

interface CommercialOffer {
    type: Offer;
    value: number;
    sliceValue?: number;
};

export interface CommercialOffers {
    offers: CommercialOffer[];
};