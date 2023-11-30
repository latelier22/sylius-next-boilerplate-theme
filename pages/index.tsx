import { getLastProducts } from '../lib/api/resources/product';
import { InferGetStaticPropsType } from "next";
import { getAllTaxons } from "../lib/api/resources/taxon";
import Layout from "../components/layout/Layout";
import Link from "next/link";
import { useContext, useEffect } from 'react';
import MessageContext from "../components/MessageContext";
import { Helmet } from 'react-helmet';
import Newsletter from '../components/features/Newsletter';
import Image from 'next/image'
import { getProductRelativeUrl, getRessourceImageUrl } from '../lib/api/urls';
import { getResourceTranslation } from '../lib/api/resources/common';
import ProductDetails from '../components/Product/ProductDetails';


const Home = (
    { products, taxons, mailchimpUrl }: InferGetStaticPropsType<typeof getStaticProps>
) => {
    const { setMessage } = useContext(MessageContext);

    useEffect(() => {
        setMessage(null);
    }, []); 

    return (
        <>
            <Helmet>
                <title>Homepage</title>
            </Helmet>

            <Layout taxons={taxons}>
                <div>
                    {/* <section>
                        <h2>Last products :</h2>
                        {products.map(product => {
                            //{console.log("PRODUCT URL :",getProductRelativeUrl(product))}
                            return(
                                <article>
                                    <Link href={getProductRelativeUrl(product)}>
                                        <a>
                                            <h2>{getResourceTranslation(product).name}</h2>
                                        </a>
                                    </Link>
                                    <Image 
                                        
                                        src={getRessourceImageUrl(product.images[0].path)} 
                                        alt={getResourceTranslation(product).name} 
                                        width="200px"
                                        height="200px"

                                    />
                                </article>
                            );
                        })}
                    </section> */
                    <section className="mt-8">
                <h2 className="text-4xl font-bold bg-red-500 mb-4">Last products :</h2>
                {products.map(product => {
                    return (
                        <article className="mb-4" key={product.slug}>
                            <Link href={getProductRelativeUrl(product)}>
                                <a className="text-blue-500 hover:underline">
                                    <h2 className="text-xl font-semibold">
                                        {getResourceTranslation(product).name}
                                    </h2>
                                </a>
                            </Link>
                            <Image 
                                src={getRessourceImageUrl(product.images[0].path)} 
                                alt={getResourceTranslation(product).name} 
                                width="200px"
                                height="200px"
                                className="rounded-lg"
                            />
                        </article>
                    );
                })}
            </section>}

                    <Newsletter mailchimpUrl={mailchimpUrl} />

                </div>
            </Layout>
        </>
    );
}

export const getStaticProps = async () => {
    
    const products = await getLastProducts(6);
    
    const taxons = await getAllTaxons();
    console.log(products[0].slug, taxons[0].slug);
    
    const mailchimpUrl: string = process.env.MAILCHIMP_URL as string;

    return {
        props: {
            products,
            taxons,
            mailchimpUrl
        },
        revalidate: 60
    }
    
}

export default Home;