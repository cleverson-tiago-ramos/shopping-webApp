import Head from "next/head";
import React from "react";

interface SeoHeadProps {
  title: string;
  description: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description }) => {
  const siteTitle = "Vantage App"; // Nome do seu site

  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
    </Head>
  );
};

export default SeoHead;
