import React from 'react';
import { PageContainer, RichText } from './snippets/Snippets';
import ShowListedCategory from './snippets/ShowListedCategory';
import MainCarousel from './snippets/MainCarousel';

const CategoryPage = ({ category }) => {
    return (
        <>
            <MainCarousel category={category} />
            <PageContainer>
                <RichText heading="Popular Now" />
                <ShowListedCategory category={category} listType="popular" />
                <RichText heading="Top Rated" />
                <ShowListedCategory category={category} listType="top_rated" />
            </PageContainer>
        </>
    );
};

export default CategoryPage;