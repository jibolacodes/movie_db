import React from 'react';
import PropTypes from 'prop-types';
// Styles
import { Wrapper, Content, Text } from './HeroImage.style';

const HeroImage = (props) =>  (
    // or const HeroImage = ({ image, title, text }) : Destructuring Component.
    <Wrapper image={props.image}>
        <Content>
            <Text>
                <h1>{props.title}</h1>
                <p>{props.text}</p>
            </Text>
        </Content>
    </Wrapper>
);

HeroImage.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
}


export default HeroImage;
