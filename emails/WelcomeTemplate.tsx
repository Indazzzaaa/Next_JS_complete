import React, { CSSProperties } from 'react'
import { Tailwind, Html, Body, Container, Text, Link, Preview } from "@react-email/components"

const WelcomeTemplate = ({ name }: { name: string }) => {
    return (
        <Html>
            <Preview>
                Welcome Aboard!
            </Preview>
            <Tailwind>
                <Body className='bg-white'>
                    <Container>
                        <Text className='font-bold text-3xl'> Hello  {name}</Text>
                        <Link href='www.google.com'>WWW.google.com</Link>
                    </Container>
                </Body>
            </Tailwind>

        </Html>
    )
}


{/* <Text style={heading}> Hello  {name}</Text> this is how we can use custom style in property */ }
const body: CSSProperties = {
    background: '#fff'
}
const heading: CSSProperties = {
    fontSize: '32px'
}


export default WelcomeTemplate