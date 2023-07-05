import Head from "next/head";

export default function SEO({ title, children, content, canonical }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta 
            name="description" 
            content={content}
            key="desc"
        />
            <link rel="canonical" href={canonical} />
            <link rel="icon" href="white_vector_crow_icon.png" />
      </Head>
      {children}
    </>
  );
}