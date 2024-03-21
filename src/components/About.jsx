import React from 'react';
import { PageContainer } from './snippets/Snippets';

const About = () => {
    return (
        <PageContainer>
            <div className="text-primary flex flex-col justify-center item-center text-justify gap-5 sm:w-5/6 md:w-2/3 lg:w-1/2 m-auto">
                <div className="flex flex-col text-center justify-center">
                    <h1 className="text-tertiary font-bold text-2xl">TIWFLIX</h1>
                    <h1 className="text-2xl"> A Platform Demonstrating Proficiency in ReactJS Development</h1>
                </div>
                <p>Welcome to TiwFlix, an exemplary streaming platform meticulously crafted to underscore expertise in ReactJS development. TiwFlix serves as a distinguished showcase of dedication and skill, representing a high standard in web development.</p>
                <p>Embark on a journey through our intuitively designed streaming platform, meticulously crafted with the latest in ReactJS technology. Navigate effortlessly through our thoughtfully curated library of content, featuring a rich variety of captivating films and engaging series, all presented with a focus on seamless user experience and responsive design.</p>

                <h4>Disclaimer:</h4>
                <p>Please be advised that TiwFlix is strictly designed for training purposes and serves solely as a demonstration of ReactJS proficiency for portfolio presentation. It is not to be utilized for commercial endeavors or any other purposes beyond its intended scope. Your understanding and compliance are greatly appreciated.</p>
            </div>
        </PageContainer>
    );
};

export default About;