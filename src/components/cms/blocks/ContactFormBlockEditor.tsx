import React from 'react';
import { ContactFormBlockContent, FormField } from '@/types/cms';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface ContactFormBlockEditorProps {
  content: ContactFormBlockContent;
  onUpdate: (___content: ContactFormBlockContent) => void;
}

const ContactFormBlockEditor: React.FC<ContactFormBlockEditorProps> = ({ content, onUpdate }) => {
  const handleChange = (field: keyof ContactFormBlockContent, value: any): void => {
    onUpdate({
      ...content,
      [field]: value,
    });
  };

  const handleFieldChange = (fieldId: string, field: keyof FormField, value: any): void => {
    const updatedFields = content.fields.map((___f) =>
      f.id === fieldId ? { ...f, [field]: value } : f
    );
    handleChange('fields', updatedFields);
  };

  const handleAddField = (): void => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      type: 'text',
      label: '',
      required: false,
      order: content.fields.length,
    };
    handleChange('fields', [...content.fields, newField]);
  };

  const handleRemoveField = (fieldId: string): void => {
    const updatedFields = content.fields.filter((___field) => field.id !== fieldId);
    handleChange('fields', updatedFields);
  };

  const handleDragEnd = (result: any): void => {
    if (!result.destination) {
      return;
    }

    const fields = Array.from(content.fields);
    const [removed] = fields.splice(result.source.index, 1);
    fields.splice(result.destination.index, 0, removed);

    handleChange('fields', fields);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-taxcat-gray">Submit Button Text</label>
          <input
            type="text"
            value={content.submitText}
            onChange={(___e) => handleChange('submitText', e.target.value)}
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
            placeholder="e.g., Send Message"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-taxcat-gray">Success Message</label>
          <input
            type="text"
            value={content.successMessage}
            onChange={(___e) => handleChange('successMessage', e.target.value)}
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
            placeholder="e.g., Thank you for your message!"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-taxcat-gray">Email To</label>
          <input
            type="email"
            value={content.emailTo}
            onChange={(___e) => handleChange('emailTo', e.target.value)}
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
            placeholder="recipient@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-taxcat-gray">Email Subject</label>
          <input
            type="text"
            value={content.subject}
            onChange={(___e) => handleChange('subject', e.target.value)}
            className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
            placeholder="New Contact Form Submission"
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-taxcat-blue">Form Fields</h3>
          <button
            type="button"
            onClick={handleAddField}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-taxcat-blue hover:bg-taxcat-blue/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-taxcat-blue transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Field
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="fields">
            {(___provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                {content.fields.map((field, ___index) => (
                  <Draggable key={field.id} draggableId={field.id} index={index}>
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
                            onClick={() => handleRemoveField(field.id)}
                            className="text-taxcat-warning hover:text-taxcat-warning/80 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-taxcat-gray">
                                Label
                              </label>
                              <input
                                type="text"
                                value={field.label}
                                onChange={(___e) =>
                                  handleFieldChange(field.id, 'label', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-taxcat-gray">
                                Type
                              </label>
                              <select
                                value={field.type}
                                onChange={(___e) =>
                                  handleFieldChange(field.id, 'type', e.target.value)
                                }
                                className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                              >
                                <option value="text">Text</option>
                                <option value="email">Email</option>
                                <option value="tel">Phone</option>
                                <option value="textarea">Text Area</option>
                                <option value="select">Select</option>
                                <option value="checkbox">Checkbox</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-taxcat-gray">
                              Placeholder
                            </label>
                            <input
                              type="text"
                              value={field.placeholder || ''}
                              onChange={(___e) =>
                                handleFieldChange(field.id, 'placeholder', e.target.value)
                              }
                              className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                            />
                          </div>

                          {field.type === 'select' && (
                            <div>
                              <label className="block text-sm font-medium text-taxcat-gray">
                                Options
                              </label>
                              <textarea
                                value={field.options?.join('\n') || ''}
                                onChange={(___e) =>
                                  handleFieldChange(field.id, 'options', e.target.value.split('\n'))
                                }
                                rows={3}
                                className="mt-1 block w-full rounded-md border-taxcat-gray/20 shadow-sm focus:border-taxcat-blue focus:ring-taxcat-blue sm:text-sm"
                                placeholder="One option per line"
                              />
                            </div>
                          )}

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={field.required}
                              onChange={(___e) =>
                                handleFieldChange(field.id, 'required', e.target.checked)
                              }
                              className="h-4 w-4 text-taxcat-blue focus:ring-taxcat-blue border-taxcat-gray/20 rounded"
                            />
                            <label className="ml-2 text-sm text-taxcat-gray">Required Field</label>
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

export default ContactFormBlockEditor;
