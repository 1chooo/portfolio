type CollegeOrUniversity = {
  "@type": "CollegeOrUniversity";
  name: string;
  sameAs: string;
};

/**
 * Schema.org type for Person
 *
 * This is a simplified version of the schema.org Person type.
 * It includes only the properties that are relevant for this application.
 *
 * @see https://schema.org/Person
 */
type Person = {
  "@context": "http://schema.org";
  "@type": "Person";
  "@id": string;
  name?: Text;
  givenName?: Text;
  familyName?: Text;
  additionalName?: Text;
  gender?: Text;
  birthPlace?: string;
  nationality?: Country;
  alumniOf?: CollegeOrUniversity[];
  jobTitle?: Text;
  skills?: Text;
  image?: URL;
  url?: URL;
  sameAs?: URL[];
  address?: Text | PostalAddress;
  knowsLanguage?: Text[] | Language[];
};

/**
 * A Text is a string.
 *
 * @see https://schema.org/Text
 */
type Text = string;

/**
 * A URL is a string that represents a web address.
 *
 * @see https://schema.org/URL
 */
type URL = string;

/**
 * Schema.org type for Language
 *
 * @see https://schema.org/Language
 */
type Language = {
  "@type": "Language";
  name: Text;
  alternateName?: Text; // E.g., ISO 639-1 code (like "en" for English)
  description?: Text;
  url?: URL;
  sameAs?: URL[];
};

/**
 * Schema.org type for PostalAddress
 *
 * @see https://schema.org/PostalAddress
 */
type PostalAddress = {
  "@type": "PostalAddress";
  addressCountry?: Text | Country;
  addressLocality?: Text;
  addressRegion?: Text;
  extendedAddress?: Text;
  postOfficeBoxNumber?: Text;
  postalCode?: Text;
  streetAddress?: Text;
};

/**
 * Schema.org type for Country
 *
 * This is a sub-type of Place and AdministrativeArea.
 *
 * @see https://schema.org/Country
 */
export interface Country {
  "@type": "Country";
  name: string;
  alternateName?: string;
  description?: string;
  url?: string;
  sameAs?: string[];

  // A commonly used property for a Place/AdministrativeArea
  geo?: GeoCoordinates | GeoShape;
}

/**
 * Schema.org type for GeoCoordinates
 * @see https://schema.org/GeoCoordinates
 */
type GeoCoordinates = {
  "@type": "GeoCoordinates";
  latitude: string | number;
  longitude: string | number;
  elevation?: string | number;
};

/**
 * Schema.org type for GeoShape
 * @see https://schema.org/GeoShape
 */
type GeoShape = {
  "@type": "GeoShape";
  box?: string;
  circle?: string;
  polygon?: string;
};

/**
 * @see https://schema.org/Thing
 */
type Thing = {
  "@type": "Thing";
  additionalType?: Text | URL;
  alternateName?: Text;
  description?: Text | TextObject;
  disambiguatingDescription?: Text;
  identifier?: Text | URL | PropertyValue;
  image?: URL | ImageObject;
  mainEntityOfPage?: URL | CreativeWork;
  name?: Text;
  potentialAction?: Action;
  sameAs?: URL;
  subjectOf?: CreativeWork | Event;
  url?: URL;
};

type Action = {
  "@type": "Action";
  error?: Thing;
};

/**
 * @see https://schema.org/CreativeWork
 */
type CreativeWork = {
  "@type": "CreativeWork";
  about?: Thing;
};

type ImageObject = {
  "@type": "ImageObject";
  caption?: MediaObject | Text;
  embeddedTextCaption?: Text;
  exifData?: PropertyValue | Text;
  representativeOfPage?: boolean;
};

/**
 * @see https://schema.org/MediaObject
 */
type MediaObject = {
  "@type": "MediaObject";
  contentUrl: URL;
};

/**
 * @see https://schema.org/PropertyValue
 */
type PropertyValue = {
  "@type": "PropertyValue";
  propertyID?: Text | URL;
  value: Text | number | boolean;
  unitCode?: Text;
  unitText?: Text;
};

/**
 * @see https://schema.org/Event
 */
type Event = {
  "@type": "Event";
  about?: Thing;
};

/**
 * A TextObject is an object that contains a description property.
 *
 * @see https://schema.org/TextObject
 */
type TextObject = {
  description: Thing;
};

/**
 * Interface for embedding JSON-LD structured data in HTML.
 * This is typically used with React's `dangerouslySetInnerHTML` to insert JSON-LD scripts.
 */
type JsonLdHtml = {
  __html: string;
};

export { type Person, type JsonLdHtml };
