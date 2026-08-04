import Script from "next/script";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Script id="google-conversion-track" strategy="afterInteractive">
                {`gtag('event', 'conversion', {'send_to': 'AW-959322441/bM5xCPbahNwcEMmyuMkD'});`}
            </Script>
        </>
    );
};

export default layout;



