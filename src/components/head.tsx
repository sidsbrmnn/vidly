import NextHead from 'next/head';
import { FunctionComponent } from 'react';

type Props = {
    title: string;
};

const Head: FunctionComponent<Props> = ({ title }: Props) => {
    return (
        <NextHead>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <meta name="description" content="" />
            <meta name="keywords" content="" />

            <title>{title}</title>
        </NextHead>
    );
};

export default Head;
