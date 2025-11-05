export type BlockType =
  | 'hero'
  | 'text'
  | 'image'
  | 'team'
  | 'services'
  | 'contact'
  | 'blog'
  | 'testimonials';

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
  settings: {
    spacing: {
      top: number;
      bottom: number;
    };
    background: {
      color: string;
      image?: string;
      overlay?: string;
    };
    visibility: {
      desktop: boolean;
      tablet: boolean;
      mobile: boolean;
    };
  };
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  content: {
    headline: string;
    subheadline: string;
    backgroundImage?: string;
    cta: {
      text: string;
      link: string;
      style: 'primary' | 'secondary';
    };
    alignment: 'left' | 'center' | 'right';
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: {
    text: string; // HTML content from TipTap
    alignment: 'left' | 'center' | 'right' | 'justify';
    maxWidth?: string;
  };
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  content: {
    src: string;
    alt: string;
    caption?: string;
    size: 'small' | 'medium' | 'large' | 'full';
    alignment: 'left' | 'center' | 'right';
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface TeamGridBlock extends BaseBlock {
  type: 'team';
  content: {
    title: string;
    description: string;
    columns: 2 | 3 | 4;
    members: TeamMember[];
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

export interface ServicesBlock extends BaseBlock {
  type: 'services';
  content: {
    title: string;
    description: string;
    layout: 'grid' | 'list' | 'cards';
    services: Service[];
    theme: 'light' | 'dark' | 'brand';
  };
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[]; // For select fields
}

export interface ContactFormBlock extends BaseBlock {
  type: 'contact';
  content: {
    title: string;
    description: string;
    fields: FormField[];
    submitButton: {
      text: string;
      style: 'primary' | 'secondary';
    };
    successMessage: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  category: string;
  publishDate: string;
  author: {
    name: string;
    image?: string;
  };
}

export interface BlogGridBlock extends BaseBlock {
  type: 'blog';
  content: {
    title: string;
    description: string;
    posts: BlogPost[];
    layout: 'grid' | 'list';
    postsPerPage: number;
  };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  image?: string;
  rating?: number;
}

export interface TestimonialsBlock extends BaseBlock {
  type: 'testimonials';
  content: {
    title: string;
    description: string;
    testimonials: Testimonial[];
    layout: 'grid' | 'slider' | 'masonry';
    theme: 'light' | 'dark' | 'brand';
  };
}

export type ContentBlock =
  | HeroBlock
  | TextBlock
  | ImageBlock
  | TeamGridBlock
  | ServicesBlock
  | ContactFormBlock
  | BlogGridBlock
  | TestimonialsBlock;

export interface Page {
  id: string;
  slug: string;
  title: string;
  description: string;
  blocks: ContentBlock[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  settings: {
    template: 'default' | 'landing' | 'blog';
    isPublished: boolean;
    password?: string;
    customCSS?: string;
    customJS?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CMSState {
  pages: Page[];
  currentPage: Page | null;
  isEditMode: boolean;
  isDragging: boolean;
  selectedBlock: string | null;
  undoStack: Page[][];
  redoStack: Page[][];
}
