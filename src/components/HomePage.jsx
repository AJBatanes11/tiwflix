import React from 'react';
import { PageContainer, RichText } from './snippets/Snippets';
import MainCarousel from './snippets/MainCarousel';
import ShowListedCategory from './snippets/ShowListedCategory';

const HomePage = () => {
    return (
        <>
            <MainCarousel category="all" />
            <PageContainer>
                <RichText heading="Popular Movies" />
                <ShowListedCategory category="movie" listType="popular" />
                <RichText heading="Popular TV Shows" />
                <ShowListedCategory category="tv" listType="popular" />
            </PageContainer>
        </>
    );
};

export default HomePage;