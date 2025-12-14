import React from 'react';
import { InvitationTemplate } from '../types';
import { MessageSquare, Link as LinkIcon, Info } from 'lucide-react';

interface TemplateEditorProps {
  template: InvitationTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<InvitationTemplate>>;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ template, setTemplate }) => {
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTemplate(prev => ({ ...prev, message: e.target.value }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate(prev => ({ ...prev, linkUrl: e.target.value }));
  };

  const previewMessage = template.message
    .replace(/{{nama}}/g, "Budi Santoso")
    .replace(/{{link}}/g, template.linkUrl);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor Section */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary-600" />
            Editor Pesan
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Link Undangan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={template.linkUrl}
                  onChange={handleLinkChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="https://..."
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Link ini akan menggantikan placeholder <code>{`{{link}}`}</code>.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Pesan
              </label>
              <textarea
                value={template.message}
                onChange={handleMessageChange}
                rows={10}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none font-sans text-sm leading-relaxed"
                placeholder="Tulis pesan Anda..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
               <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2 mb-2">
                 <Info className="w-4 h-4" />
                 Panduan Placeholder
               </h3>
               <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                 <li>Gunakan <code>{`{{nama}}`}</code> untuk menyisipkan nama tamu otomatis.</li>
                 <li>Gunakan <code>{`{{link}}`}</code> untuk menyisipkan link undangan di atas.</li>
               </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex flex-col">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Live Preview</h2>
          
          <div className="flex-1 bg-[#E5DDD5] rounded-xl p-4 md:p-8 relative overflow-hidden border border-gray-200">
             {/* WhatsApp Bubble Simulation */}
             <div className="bg-white p-3 rounded-lg shadow-sm rounded-tl-none max-w-[85%] relative">
               <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                 {previewMessage.split('\n').map((line, i) => (
                   <React.Fragment key={i}>
                     {line}
                     {i < previewMessage.split('\n').length - 1 && <br />}
                   </React.Fragment>
                 ))}
               </p>
               <div className="mt-1 text-[10px] text-gray-400 text-right">
                 {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </div>
             </div>
             
             <div className="mt-8 text-center">
                <p className="text-xs text-gray-500 bg-white/50 inline-block px-3 py-1 rounded-full backdrop-blur-sm">
                  Tampilan simulasi untuk tamu "Budi Santoso"
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};