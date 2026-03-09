import { Helmet } from "react-helmet";

type AlternateLink = {
  hreflang: string;
  href: string;
};

type SEOProps = {
  title: string;
  canonical: string;
  alternates?: AlternateLink[];
};

export default function SEO({ title, canonical, alternates = [] }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="canonical" href={canonical} />
      {alternates.map((alt) => (
        <link
          key={alt.hreflang}
          rel="alternate"
          hrefLang={alt.hreflang}
          href={alt.href}
        />
      ))}
    </Helmet>
  );
}
