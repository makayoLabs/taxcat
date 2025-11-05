'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import useCMSStore from '@/store/cmsStore';
import { ContentBlock } from '@/types/cms';

// Block Components
const HeroBlock = ({ content, settings }: ContentBlock): void => {
  return (
    <section
      className={`relative py-20 ${
        settings.background.image ? 'bg-cover bg-center' : settings.background.color
      }`}
      style={{
        backgroundImage: settings.background.image
          ? `url(${settings.background.image})`
          : undefined,
      }}
    >
      {settings.background.overlay && (
        <div
          className="absolute inset-0"
          style={{ backgroundColor: settings.background.overlay }}
        />
      )}
      <div className="relative container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-${content.alignment}`}>
          <h1 className="text-5xl md:text-6xl font-serif mb-6">{content.headline}</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">{content.subheadline}</p>
          {content.cta && (
            <a
              href={content.cta.link}
              className={`inline-block px-8 py-3 rounded-lg font-semibold transition-colors ${
                content.cta.style === 'primary'
                  ? 'bg-taxcat-blue text-white hover:bg-blue-700'
                  : 'bg-white text-taxcat-blue border-2 border-taxcat-blue/20 hover:bg-blue-50'
              }`}
            >
              {content.cta.text}
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

const TextBlock = ({ content, settings }: ContentBlock): void => {
  return (
    <div
      className={`py-12 ${settings.background.color}`}
      style={{
        paddingTop: `${settings.spacing.top}px`,
        paddingBottom: `${settings.spacing.bottom}px`,
      }}
    >
      <div
        className={`container mx-auto px-4 prose ${
          content.maxWidth ? `max-w-${content.maxWidth}` : 'max-w-4xl'
        } text-${content.alignment}`}
        dangerouslySetInnerHTML={{ __html: content.text }}
      />
    </div>
  );
};

const ImageBlock = ({ content, settings }: ContentBlock): void => {
  const sizeClasses = {
    small: 'max-w-2xl',
    medium: 'max-w-4xl',
    large: 'max-w-6xl',
    full: 'max-w-none',
  };

  return (
    <figure
      className={`py-12 ${settings.background.color}`}
      style={{
        paddingTop: `${settings.spacing.top}px`,
        paddingBottom: `${settings.spacing.bottom}px`,
      }}
    >
      <div
        className={`container mx-auto px-4 ${sizeClasses[content.size]} text-${content.alignment}`}
      >
        <img src={content.src} alt={content.alt} className="w-full h-auto rounded-lg" />
        {content.caption && (
          <figcaption className="mt-4 text-center text-gray-500 text-sm">
            {content.caption}
          </figcaption>
        )}
      </div>
    </figure>
  );
};

const TeamGridBlock = ({ content, settings }: ContentBlock): void => {
  return (
    <section
      className={`py-12 ${settings.background.color}`}
      style={{
        paddingTop: `${settings.spacing.top}px`,
        paddingBottom: `${settings.spacing.bottom}px`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600">{content.description}</p>
        </div>
        <div
          className={`grid gap-8 ${
            content.columns === 2
              ? 'md:grid-cols-2'
              : content.columns === 3
                ? 'md:grid-cols-3'
                : 'md:grid-cols-4'
          }`}
        >
          {content.members.map((___member) => (
            <div key={member.id} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-2">{member.role}</p>
              <p className="text-gray-500 text-sm">{member.bio}</p>
              {member.social && (
                <div className="flex justify-center space-x-4 mt-4">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-taxcat-blue"
                    >
                      LinkedIn
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-taxcat-blue"
                    >
                      Twitter
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-gray-400 hover:text-taxcat-blue"
                    >
                      Email
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesBlock = ({ content, settings }: ContentBlock): void => {
  const themeClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900 text-white',
    brand: 'bg-taxcat-blue text-white',
  };

  return (
    <section
      className={`py-12 ${themeClasses[content.theme]}`}
      style={{
        paddingTop: `${settings.spacing.top}px`,
        paddingBottom: `${settings.spacing.bottom}px`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">{content.title}</h2>
          <p className="text-xl opacity-80">{content.description}</p>
        </div>
        <div
          className={`grid gap-8 ${
            content.layout === 'grid'
              ? 'md:grid-cols-3'
              : content.layout === 'list'
                ? 'space-y-8'
                : 'md:grid-cols-2'
          }`}
        >
          {content.services.map((___service) => (
            <div
              key={service.id}
              className={`${content.layout === 'cards' ? 'bg-white/10 p-6 rounded-lg' : ''}`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-white/10"
                  dangerouslySetInnerHTML={{ __html: service.icon }}
                />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="opacity-80">{service.description}</p>
                  {service.link && (
                    <a
                      href={service.link}
                      className="inline-block mt-4 text-sm font-semibold hover:opacity-80"
                    >
                      Learn More →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFormBlock = ({ content, settings }: ContentBlock): void => {
  return (
    <section
      className={`py-12 ${settings.background.color}`}
      style={{
        paddingTop: `${settings.spacing.top}px`,
        paddingBottom: `${settings.spacing.bottom}px`,
      }}
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600">{content.description}</p>
        </div>
        <form className="space-y-6">
          {content.fields.map((___field) => (
            <div key={field.id}>
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue"
                  rows={4}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.id}
                  required={field.required}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map((___option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  id={field.id}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
              content.submitButton.style === 'primary'
                ? 'bg-taxcat-blue text-white hover:bg-blue-700'
                : 'bg-white text-taxcat-blue border-2 border-taxcat-blue/20 hover:bg-blue-50'
            }`}
          >
            {content.submitButton.text}
          </button>
        </form>
      </div>
    </section>
  );
};

const BlogGridBlock = ({ content, settings }: ContentBlock): void => {
  return (
    <section
      className={`py-12 ${settings.background.color}`}
      style={{
        paddingTop: `${settings.spacing.top}px`,
        paddingBottom: `${settings.spacing.bottom}px`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">{content.title}</h2>
          <p className="text-xl text-gray-600">{content.description}</p>
        </div>
        <div className={`grid gap-8 ${content.layout === 'grid' ? 'md:grid-cols-3' : ''}`}>
          {content.posts.slice(0, content.postsPerPage).map((___post) => (
            <article
              key={post.id}
              className={`${content.layout === 'list' ? 'flex space-x-6' : ''}`}
            >
              <div className={`${content.layout === 'list' ? 'flex-shrink-0 w-48' : 'mb-4'}`}>
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <time dateTime={post.publishDate}>
                    {new Date(post.publishDate).toLocaleDateString()}
                  </time>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center space-x-3">
                  {post.author.image && (
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-500">{post.author.name}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsBlock = ({ content, settings }: ContentBlock): void => {
  const themeClasses = {
    light: 'bg-white',
    dark: 'bg-gray-900 text-white',
    brand: 'bg-taxcat-blue text-white',
  };

  return (
    <section
      className={`py-12 ${themeClasses[content.theme]}`}
      style={{
        paddingTop: `${settings.spacing.top}px`,
        paddingBottom: `${settings.spacing.bottom}px`,
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">{content.title}</h2>
          <p className="text-xl opacity-80">{content.description}</p>
        </div>
        <div
          className={`grid gap-8 ${
            content.layout === 'grid'
              ? 'md:grid-cols-3'
              : content.layout === 'masonry'
                ? 'md:columns-3'
                : ''
          }`}
        >
          {content.testimonials.map((___testimonial) => (
            <div key={testimonial.id} className="bg-white/10 p-6 rounded-lg">
              {testimonial.rating && (
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, ___i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <blockquote className="text-lg mb-4">{testimonial.quote}</blockquote>
              <div className="flex items-center space-x-4">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <cite className="font-semibold not-italic">{testimonial.author}</cite>
                  {(testimonial.role || testimonial.company) && (
                    <p className="text-sm opacity-80">
                      {testimonial.role}
                      {testimonial.role && testimonial.company && ' • '}
                      {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlockRenderer = ({ block }: { block: ContentBlock }): void => {
  const components = {
    hero: HeroBlock,
    text: TextBlock,
    image: ImageBlock,
    team: TeamGridBlock,
    services: ServicesBlock,
    contact: ContactFormBlock,
    blog: BlogGridBlock,
    testimonials: TestimonialsBlock,
  };

  const Component = components[block.type];

  if (!Component) {
    return null;
  }

  const { visibility } = block.settings;
  const isVisible =
    (visibility.desktop && window.innerWidth >= 1024) ||
    (visibility.tablet && window.innerWidth >= 640 && window.innerWidth < 1024) ||
    (visibility.mobile && window.innerWidth < 640);

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Component {...block} />
    </motion.div>
  );
};

export default function DynamicPage(): void {
  const { slug } = useParams();
  const { pages } = useCMSStore();
  const page = pages.find((_p) => p.slug === slug);

  useEffect(() => {
    if (_page) =>
      document.title = page.seo.title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', page.seo.description);
      document
        .querySelector('meta[name="keywords"]')
        ?.setAttribute('content', page.seo.keywords.join(', '));
    }
  }, [page]);

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Page Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {page.blocks.map((___block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
}
