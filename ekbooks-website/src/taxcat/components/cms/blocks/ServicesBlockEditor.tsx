import React from 'react';
import { ServicesBlockContent, Service } from '@/types/cms';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface ServicesBlockEditorProps {
  content: ServicesBlockContent;
  onUpdate: (___content: ServicesBlockContent) => void;
}

const ServicesBlockEditor: React.FC<ServicesBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof ServicesBlockContent, value: any): void => {
    onUpdate({
      ...content,
      [field]: value,
    });
  };

  const handleServiceChange = (
    serviceId: string,
    field: keyof Service,
    value: string | string[]
  ) => {
    const updatedServices = content.services.map((___service) =>
      service.id === serviceId ? { ...service, [field]: value } : service
    );
    handleChange('services', updatedServices);
  };

  const handleAddService = (): void => {
    const newService: Service = {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      icon: '',
      features: [],
    };
    handleChange('services', [...content.services, newService]);
  };

  const handleRemoveService = (serviceId: string): void => {
    const updatedServices = content.services.filter((___service) => service.id !== serviceId);
    handleChange('services', updatedServices);
  };

  const handleFeatureChange = (serviceId: string, index: number, value: string): void => {
    const service = content.services.find((___s) => s.id === serviceId);
    if (!service) {
      return;
    }

    const updatedFeatures = [...(service.features || [])];
    updatedFeatures[index] = value;
    handleServiceChange(serviceId, 'features', updatedFeatures);
  };

  const handleAddFeature = (serviceId: string): void => {
    const service = content.services.find((___s) => s.id === serviceId);
    if (!service) {
      return;
    }

    const updatedFeatures = [...(service.features || []), ''];
    handleServiceChange(serviceId, 'features', updatedFeatures);
  };

  const handleRemoveFeature = (serviceId: string, index: number): void => {
    const service = content.services.find((___s) => s.id === serviceId);
    if (!service) {
      return;
    }

    const updatedFeatures = (service.features || []).filter((_, ___i) => i !== index);
    handleServiceChange(serviceId, 'features', updatedFeatures);
  };

  const handleDragEnd = (result: any): void => {
    if (!result.destination) {
      return;
    }

    const services = Array.from(content.services);
    const [removed] = services.splice(result.source.index, 1);
    services.splice(result.destination.index, 0, removed);

    handleChange('services', services);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-taxcat-gray">Layout</label>
          <select
            value={content.layout}
            onChange={(___e) => handleChange('layout', e.target.value as 'grid' | 'list' | 'cards')}
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
          >
            <option value="grid">Grid</option>
            <option value="list">List</option>
            <option value="cards">Cards</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-taxcat-gray">Columns</label>
          <select
            value={content.columns}
            onChange={(___e) => handleChange('columns', parseInt(e.target.value) as 2 | 3 | 4)}
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
          >
            <option value={2}>2 Columns</option>
            <option value={3}>3 Columns</option>
            <option value={4}>4 Columns</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={content.showPricing}
            onChange={(___e) => handleChange('showPricing', e.target.checked)}
            className="h-4 w-4 text-taxcat-blue focus:ring-taxcat-blue border-taxcat-gray/20 rounded"
          />
          <label className="ml-2 text-sm text-taxcat-gray">Show Pricing</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-taxcat-gray">Theme</label>
        <select
          value={content.theme}
          onChange={(___e) =>
            handleChange(
              'theme',
              e.target.value as 'default' | 'taxcat-blue' | 'taxcat-white' | 'taxcat-gray'
            )
          }
          className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
        >
          <option value="default">Default</option>
          <option value="taxcat-blue">TaxCat Blue</option>
          <option value="taxcat-white">Clean White</option>
          <option value="taxcat-gray">Professional Gray</option>
        </select>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-taxcat-blue">Services</h3>
          <button
            type="button"
            onClick={handleAddService}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-taxcat-blue hover:bg-taxcat-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-taxcat-blue transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="services">
            {(___provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {content.services.map((service, ___index) => (
                  <Draggable key={service.id} draggableId={service.id} index={index}>
                    {(___provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="bg-taxcat-white rounded-lg shadow p-4 border border-taxcat-gray/10"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center text-taxcat-gray cursor-move"
                          >
                            <GripVertical className="w-5 h-5" />
                          </div>
                          <button
                            onClick={() => handleRemoveService(service.id)}
                            className="text-taxcat-warning hover:text-taxcat-warning/80 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-taxcat-gray">
                              Title
                            </label>
                            <input
                              type="text"
                              value={service.title}
                              onChange={(___e) =>
                                handleServiceChange(service.id, 'title', e.target.value)
                              }
                              className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-taxcat-gray">
                              Description
                            </label>
                            <textarea
                              value={service.description}
                              onChange={(___e) =>
                                handleServiceChange(service.id, 'description', e.target.value)
                              }
                              rows={3}
                              className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-taxcat-gray">
                              Icon
                            </label>
                            <input
                              type="text"
                              value={service.icon}
                              onChange={(___e) =>
                                handleServiceChange(service.id, 'icon', e.target.value)
                              }
                              className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                            />
                          </div>

                          {content.showPricing && (
                            <div>
                              <label className="block text-sm font-medium text-taxcat-gray">
                                Price
                              </label>
                              <input
                                type="text"
                                value={service.price || ''}
                                onChange={(___e) =>
                                  handleServiceChange(service.id, 'price', e.target.value)
                                }
                                placeholder="e.g. $99/month"
                                className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                              />
                            </div>
                          )}

                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <label className="block text-sm font-medium text-taxcat-gray">
                                Features
                              </label>
                              <button
                                type="button"
                                onClick={() => handleAddFeature(service.id)}
                                className="text-sm text-taxcat-blue hover:text-taxcat-blue"
                              >
                                + Add Feature
                              </button>
                            </div>
                            <div className="space-y-2">
                              {(service.features || []).map((feature, ___featureIndex) => (
                                <div key={featureIndex} className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(___e) =>
                                      handleFeatureChange(service.id, featureIndex, e.target.value)
                                    }
                                    className="block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                                  />
                                  <button
                                    onClick={() => handleRemoveFeature(service.id, featureIndex)}
                                    className="text-taxcat-warning hover:text-taxcat-warning"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default ServicesBlockEditor;
