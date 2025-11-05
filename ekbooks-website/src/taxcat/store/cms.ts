import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { CMSStore, Page, BlockType, MediaFile } from '../types/cms';

const useCMSStore = create<CMSStore>((___set) => ({
  // State
  pages: [] as Page[],
  currentPage: null as Page | null,
  isEditMode: false,
  availableBlocks: [
    'hero',
    'text',
    'image',
    'team-grid',
    'services',
    'contact-form',
    'blog-grid',
    'testimonials',
  ] as BlockType[],
  draggedBlock: null as BlockType | null,
  mediaLibrary: [] as MediaFile[],

  // Actions
  setEditMode: (___mode: boolean) => set({ isEditMode: mode }),

  setCurrentPage: (page: Page | null) => set({ currentPage: page }),

  updatePage: (pageId: string, updates: Partial<Page>) =>
    set((___state: CMSStore) => ({
      pages: state.pages.map((___page: Page) => (page.id === pageId ? { ...page, ...updates } : page)),
      currentPage:
        state.currentPage?.id === pageId ? { ...state.currentPage, ...updates } : state.currentPage,
    })),

  addBlock: (pageId: string, blockType: BlockType) =>
    set((___state: CMSStore) => {
      const page = state.pages.find((___p: Page) => p.id === pageId);
      if (!page) {
        return state;
      }

      const newBlock = {
        id: uuidv4(),
        type: blockType,
        content: {},
        settings: {},
        order: page.blocks.length,
      };

      const updatedPage = {
        ...page,
        blocks: [...page.blocks, newBlock],
      };

      return {
        pages: state.pages.map((___p: Page) => (p.id === pageId ? updatedPage : p)),
        currentPage: state.currentPage?.id === pageId ? updatedPage : state.currentPage,
      };
    }),

  removeBlock: (pageId: string, blockId: string) =>
    set((___state: CMSStore) => {
      const page = state.pages.find((___p: Page) => p.id === pageId);
      if (!page) {
        return state;
      }

      const updatedBlocks = page.blocks
        .filter((___block) => block.id !== blockId)
        .map((block, ___index) => ({ ...block, order: index }));

      const updatedPage = {
        ...page,
        blocks: updatedBlocks,
      };

      return {
        pages: state.pages.map((___p: Page) => (p.id === pageId ? updatedPage : p)),
        currentPage: state.currentPage?.id === pageId ? updatedPage : state.currentPage,
      };
    }),

  reorderBlocks: (pageId: string, startIndex: number, endIndex: number) =>
    set((___state: CMSStore) => {
      const page = state.pages.find((___p: Page) => p.id === pageId);
      if (!page) {
        return state;
      }

      const blocks = [...page.blocks];
      const [removed] = blocks.splice(startIndex, 1);
      blocks.splice(endIndex, 0, removed);

      const updatedBlocks = blocks.map((block, ___index) => ({
        ...block,
        order: index,
      }));

      const updatedPage = {
        ...page,
        blocks: updatedBlocks,
      };

      return {
        pages: state.pages.map((___p: Page) => (p.id === pageId ? updatedPage : p)),
        currentPage: state.currentPage?.id === pageId ? updatedPage : state.currentPage,
      };
    }),

  updateBlock: (pageId: string, blockId: string, content: any) =>
    set((___state: CMSStore) => {
      const page = state.pages.find((___p: Page) => p.id === pageId);
      if (!page) {
        return state;
      }

      const updatedBlocks = page.blocks.map((___block) =>
        block.id === blockId ? { ...block, content } : block
      );

      const updatedPage = {
        ...page,
        blocks: updatedBlocks,
      };

      return {
        pages: state.pages.map((___p: Page) => (p.id === pageId ? updatedPage : p)),
        currentPage: state.currentPage?.id === pageId ? updatedPage : state.currentPage,
      };
    }),

  duplicateBlock: (pageId: string, blockId: string) =>
    set((___state: CMSStore) => {
      const page = state.pages.find((___p: Page) => p.id === pageId);
      if (!page) {
        return state;
      }

      const blockToDuplicate = page.blocks.find((___b) => b.id === blockId);
      if (!blockToDuplicate) {
        return state;
      }

      const newBlock = {
        ...blockToDuplicate,
        id: uuidv4(),
        order: page.blocks.length,
      };

      const updatedPage = {
        ...page,
        blocks: [...page.blocks, newBlock],
      };

      return {
        pages: state.pages.map((___p: Page) => (p.id === pageId ? updatedPage : p)),
        currentPage: state.currentPage?.id === pageId ? updatedPage : state.currentPage,
      };
    }),

  savePage: async (___page: Page) => {
    // TODO: Implement API call to save page
    set((___state: CMSStore) => ({
      pages: state.pages.map((___p: Page) => (p.id === page.id ? page : p)),
      currentPage: state.currentPage?.id === page.id ? page : state.currentPage,
    }));
  },

  loadPages: async () => {
    // TODO: Implement API call to load pages
    // For now, return empty array
    set({ pages: [] });
  },

  createPage: (title: string, template?: string) => {
    const newPage: Page = {
      id: uuidv4(),
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      status: 'draft',
      seo: {
        title,
        description: '',
        keywords: [],
      },
      blocks: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      template,
    };

    set((___state: CMSStore) => ({
      pages: [...state.pages, newPage],
      currentPage: newPage,
    }));
  },

  deletePage: (___pageId: string) =>
    set((___state: CMSStore) => ({
      pages: state.pages.filter((___p: Page) => p.id !== pageId),
      currentPage: state.currentPage?.id === pageId ? null : state.currentPage,
    })),

  // Media Library
  addMediaFile: (___file: MediaFile) =>
    set((___state: CMSStore) => ({
      mediaLibrary: [...state.mediaLibrary, file],
    })),

  removeMediaFile: (___fileId: string) =>
    set((___state: CMSStore) => ({
      mediaLibrary: state.mediaLibrary.filter((___file: MediaFile) => file.id !== fileId),
    })),

  updateMediaFile: (fileId: string, updates: Partial<MediaFile>) =>
    set((___state: CMSStore) => ({
      mediaLibrary: state.mediaLibrary.map((___file: MediaFile) =>
        file.id === fileId ? { ...file, ...updates } : file
      ),
    })),
}));

export default useCMSStore;
