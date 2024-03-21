import React from 'react';
import { PageContainer, RichText } from './snippets/Snippets';
import ShowListedCategory from './snippets/ShowListedCategory';
import MainCarousel from './snippets/MainCarousel';

const CategoryPage = ({ category }) => {
    return (
        <>
            <MainCarousel category={category} />
            <PageContainer>
                <RichText heading="Popular Now" className="my-5" />
                <ShowListedCategory category={category} listType="popular" />
                <RichText heading="Top Rated" className="my-5" />
                <ShowListedCategory category={category} listType="top_rated" />
            </PageContainer>
        </>
    );
};

export default CategoryPage;