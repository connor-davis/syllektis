import styled, { keyframes } from 'styled-components'

import { fadeIn } from 'react-animations'

const FadeInAnimation = keyframes`${fadeIn}`;
export const FadeIn = styled.div`
    animation: 0.4s ${FadeInAnimation};
`;