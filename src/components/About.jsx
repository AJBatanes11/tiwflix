import React from 'react';
import { PageContainer } from './snippets/Snippets';

const About = () => {
    return (
        <PageContainer>
            <div className="text-primary py-5 flex flex-col justify-center item-center text-justify gap-10 sm:w-5/6 md:w-2/3 lg:w-1/2 m-auto">
                <h1 className="text-tertiary font-bold text-2xl text-center">TIWFLIX</h1>
                <div className="flex flex-col text-center justify-center gap-5">
                    <h2 className="font-bold text-lg">A Platform Demonstrating Proficiency in ReactJS Development</h2>
                    <p className="text-left">
                        Welcome to TiwFlix, an exemplary streaming platform meticulously crafted to underscore expertise in ReactJS development. TiwFlix serves as a distinguished showcase of dedication and skill, representing a high standard in web development.
                        <br /><br />
                        Embark on a journey through our intuitively designed streaming platform, meticulously crafted with the latest in ReactJS technology. Navigate effortlessly through our thoughtfully curated library of content, featuring a rich variety of captivating films and engaging series, all presented with a focus on seamless user experience and responsive design.
                    </p>

                </div>

                <div className="flex flex-col text-center justify-center gap-5">
                    <h2 className="font-bold text-lg">Disclaimer</h2>
                    <p className="text-left">
                        Please be advised that TiwFlix is strictly designed for training purposes and serves solely as a demonstration of ReactJS proficiency for portfolio presentation. It is not to be utilized for commercial endeavors or any other purposes beyond its intended scope. Your understanding and compliance are greatly appreciated.
                    </p>
                </div>
            </div>
        </PageContainer>
    );
};

export default About;