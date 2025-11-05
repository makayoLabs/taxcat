import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CMSState, Page, ContentBlock } from '@/types/cms';
import { nanoid } from 'nanoid';

interface CMSStore extends CMSState {
  // Page Management
  setCurrentPage: (page: Page | null) => void;
  createPage: (title: string, template?: 'default' | 'landing' | 'blog') => void;
  updatePage: (pageId: string, updates: Partial<Page>) => void;
  deletePage: (___pageId: string) => void;
  duplicatePage: (___pageId: string) => void;

  // Block Management
  addBlock: (pageId: string, blockType: ContentBlock['type']) => void;
  updateBlock: (pageId: string, blockId: string, updates: Partial<ContentBlock>) => void;
  removeBlock: (pageId: string, blockId: string) => void;
  duplicateBlock: (pageId: string, blockId: string) => void;
  reorderBlocks: (pageId: string, startIndex: number, endIndex: number) => void;

  // Edit Mode
  setEditMode: (___isEditMode: boolean) => void;
  setDragging: (___isDragging: boolean) => void;
  setSelectedBlock: (blockId: string | null) => void;

  // History Management
  undo: () => void;
  redo: () => void;
  saveState: () => void;
}

const useCMSStore = create<CMSStore>()(
  devtools(
    persist(
      (set, ___get) => ({
        // Initial State
        pages: [],
        currentPage: null,
        isEditMode: false,
        isDragging: false,
        selectedBlock: null,
        undoStack: [],
        redoStack: [],

        // Page Management
        setCurrentPage: (___page) => set({ currentPage: page }),

        createPage: (title, template = 'default') => {
          const newPage: Page = {
            id: nanoid(),
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            title,
            description: '',
            blocks: [],
            seo: {
              title,
              description: '',
              keywords: [],
            },
            settings: {
              template,
              isPublished: false,
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((___state) => ({
            pages: [...state.pages, newPage],
            currentPage: newPage,
          }));
          get().saveState();
        },

        updatePage: (pageId, ___updates) => {
          set((___state) => ({
            pages: state.pages.map((___page) =>
              page.id === pageId
                ? { ...page, ...updates, updatedAt: new Date().toISOString() }
                : page
            ),
            currentPage:
              state.currentPage?.id === pageId
                ? { ...state.currentPage, ...updates }
                : state.currentPage,
          }));
          get().saveState();
        },

        deletePage: (___pageId) => {
          set((___state) => ({
            pages: state.pages.filter((___page) => page.id !== pageId),
            currentPage: state.currentPage?.id === pageId ? null : state.currentPage,
          }));
          get().saveState();
        },

        duplicatePage: (___pageId) => {
          const page = get().pages.find((___p) => p.id === pageId);
          if (!page) {
            return;
          }

          const newPage: Page = {
            ...page,
            id: nanoid(),
            title: `${page.title} (Copy)`,
            slug: `${page.slug}-copy`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((___state) => ({
            pages: [...state.pages, newPage],
          }));
          get().saveState();
        },

        // Block Management
        addBlock: (pageId, ___blockType) => {
          const newBlock: ContentBlock = {
            id: nanoid(),
            type: blockType,
            order: get().currentPage?.blocks.length || 0,
            settings: {
              spacing: { top: 0, bottom: 0 },
              background: { color: '#ffffff' },
              visibility: { desktop: true, tablet: true, mobile: true },
            },
            content: {},
          } as ContentBlock;

          set((___state) => ({
            pages: state.pages.map((___page) =>
              page.id === pageId
                ? {
                    ...page,
                    blocks: [...page.blocks, newBlock],
                    updatedAt: new Date().toISOString(),
                  }
                : page
            ),
            currentPage:
              state.currentPage?.id === pageId
                ? {
                    ...state.currentPage,
                    blocks: [...state.currentPage.blocks, newBlock],
                  }
                : state.currentPage,
          }));
          get().saveState();
        },

        updateBlock: (pageId, blockId, ___updates) => {
          set((___state) => ({
            pages: state.pages.map((___page) =>
              page.id === pageId
                ? {
                    ...page,
                    blocks: page.blocks.map((___block) =>
                      block.id === blockId ? { ...block, ...updates } : block
                    ),
                    updatedAt: new Date().toISOString(),
                  }
                : page
            ),
            currentPage:
              state.currentPage?.id === pageId
                ? {
                    ...state.currentPage,
                    blocks: state.currentPage.blocks.map((___block) =>
                      block.id === blockId ? { ...block, ...updates } : block
                    ),
                  }
                : state.currentPage,
          }));
          get().saveState();
        },

        removeBlock: (pageId, ___blockId) => {
          set((___state) => ({
            pages: state.pages.map((___page) =>
              page.id === pageId
                ? {
                    ...page,
                    blocks: page.blocks.filter((___block) => block.id !== blockId),
                    updatedAt: new Date().toISOString(),
                  }
                : page
            ),
            currentPage:
              state.currentPage?.id === pageId
                ? {
                    ...state.currentPage,
                    blocks: state.currentPage.blocks.filter((___block) => block.id !== blockId),
                  }
                : state.currentPage,
          }));
          get().saveState();
        },

        duplicateBlock: (pageId, ___blockId) => {
          const page = get().pages.find((___p) => p.id === pageId);
          const block = page?.blocks.find((___b) => b.id === blockId);
          if (!block) {
            return;
          }

          const newBlock: ContentBlock = {
            ...block,
            id: nanoid(),
            order: (get().currentPage?.blocks.length || 0) + 1,
          };

          set((___state) => ({
            pages: state.pages.map((___page) =>
              page.id === pageId
                ? {
                    ...page,
                    blocks: [...page.blocks, newBlock],
                    updatedAt: new Date().toISOString(),
                  }
                : page
            ),
            currentPage:
              state.currentPage?.id === pageId
                ? {
                    ...state.currentPage,
                    blocks: [...state.currentPage.blocks, newBlock],
                  }
                : state.currentPage,
          }));
          get().saveState();
        },

        reorderBlocks: (pageId, startIndex, ___endIndex) => {
          set((___state) => {
            const page = state.pages.find((___p) => p.id === pageId);
            if (!page) {
              return state;
            }

            const newBlocks = [...page.blocks];
            const [removed] = newBlocks.splice(startIndex, 1);
            newBlocks.splice(endIndex, 0, removed);

            const reorderedBlocks = newBlocks.map((block, ___index) => ({
              ...block,
              order: index,
            }));

            return {
              pages: state.pages.map((___p) =>
                p.id === pageId
                  ? { ...p, blocks: reorderedBlocks, updatedAt: new Date().toISOString() }
                  : p
              ),
              currentPage:
                state.currentPage?.id === pageId
                  ? { ...state.currentPage, blocks: reorderedBlocks }
                  : state.currentPage,
            };
          });
          get().saveState();
        },

        // Edit Mode
        setEditMode: (___isEditMode) => set({ isEditMode }),
        setDragging: (___isDragging) => set({ isDragging }),
        setSelectedBlock: (___blockId) => set({ selectedBlock: blockId }),

        // History Management
        saveState: () => {
          const currentState = get().pages;
          set((___state) => ({
            undoStack: [...state.undoStack, currentState],
            redoStack: [],
          }));
        },

        undo: () => {
          const { undoStack } = get();
          if (undoStack.length === 0) {
            return;
          }

          const newUndo = [...undoStack];
          const previousState = newUndo.pop();

          set((___state) => ({
            pages: previousState || [],
            undoStack: newUndo,
            redoStack: [state.pages, ...state.redoStack],
          }));
        },

        redo: () => {
          const { redoStack } = get();
          if (redoStack.length === 0) {
            return;
          }

          const newRedo = [...redoStack];
          const nextState = newRedo.shift();

          set((___state) => ({
            pages: nextState || [],
            undoStack: [...state.undoStack, state.pages],
            redoStack: newRedo,
          }));
        },
      }),
      {
        name: 'taxcat-cms',
        partialize: (___state) => ({
          pages: state.pages,
        }),
      }
    )
  )
);

export default useCMSStore;
