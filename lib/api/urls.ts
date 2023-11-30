import { IgetResourceUrl } from '../../types/fetchTypes';
import { IProduct } from '../../types/resources/productTypes';
import { ITaxon } from '../../types/resources/taxonTypes';
import { createUrl } from '../router/router';
import { getResourceTranslation } from './resources/common';


export const getApiResourcePublicUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_RESOURCE_BASE_URL as string;
}

export const getApiPublicUrl = (): string => {
    return process.env.NEXT_PUBLIC_API_PUBLIC_URL as string;
}

export const getRessourceImageUrl = (imageSlug: string): string => {
    //console.log("URL IMAGE:", getApiPublicUrl()+imageSlug)
    return getApiPublicUrl()+imageSlug;
}

export const getTaxonRelativeUrl = (taxon: ITaxon): string => {
    // A MODIFIER //
    // return '/'+getPrefixCategories()+'/'+getResourceTranslation(taxon).slug;
    const parts = taxon.slug.split("/");
        const lastPart = parts[parts.length - 1];
    console.log("taxon slug",taxon.slug,lastPart)
    
    console.log("getTaxonRelativeUrl",'/'+getPrefixCategories()+'/'+lastPart)
    return '/'+getPrefixCategories()+'/'+lastPart;
}

export const getProductRelativeUrl = (product: IProduct) => {
    let mainTaxonSlug = getGenericMainTaxonSlug();
    const productSlug = getResourceTranslation(product).slug;
    console.log("productSlug",productSlug);
    console.log("product.mainTaxon",product.mainTaxon);
    


    if (product.mainTaxon) {
        const parts = product.mainTaxon.split("/");
        const lastPart = parts[parts.length - 1];
         console.log("product.mainTaxon split :",lastPart)
         mainTaxonSlug = lastPart
    //     mainTaxonSlug = getResourceTranslation(product.mainTaxon).slug;
     }

    console.log("getProductRelativeUrl",'/'+getPrefixCategories()+'/'+mainTaxonSlug+'/'+productSlug);

    return '/'+getPrefixCategories()+'/'+mainTaxonSlug+'/'+productSlug;
}

const getPrefixCategories = (): string => {
    return 'categories';
}

export const getGenericMainTaxonSlug = (): string => {
    return 'tout';
}

// construct the fetch url for a specific ressource, including parameters
export const getResourceUrl: IgetResourceUrl = (ressourceLocator, pathParams, queryParams) => {
    let baseUrl = getApiResourcePublicUrl() + ressourceLocator;

    return createUrl(baseUrl, pathParams, queryParams);
}
