import React, { useState, useEffect } from 'react';
import { Guest, InvitationTemplate, AppTab } from './types';
import { INITIAL_TEMPLATE, MOCK_GUESTS } from './constants';
import { GuestManager } from './components/GuestManager';
import { TemplateEditor } from './components/TemplateEditor';
import { Dispatcher } from './components/Dispatcher';
import { Users, FileText, Send, Menu, X } from 'lucide-react';

const App = () => {
  // --- State Management ---
  // In a real Next.js app, this would likely be fetched from an API/Database
  // Here we use localStorage to persist data for the demo.
  
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.GUESTS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('undangin_guests');
    return saved ? JSON.parse(saved) : MOCK_GUESTS;
  });

  const [template, setTemplate] = useState<InvitationTemplate>(() => {
    const saved = localStorage.getItem('undangin_template');
    return saved ? JSON.parse(saved) : INITIAL_TEMPLATE;
  });

  // Persist State
  useEffect(() => {
    localStorage.setItem('undangin_guests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('undangin_template', JSON.stringify(template));
  }, [template]);

  const handleMarkSent = (id: string) => {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, status: 'sent' } : g));
  };

  // --- Render Helpers ---

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.GUESTS:
        return <GuestManager guests={guests} setGuests={setGuests} />;
      case AppTab.TEMPLATE:
        return <TemplateEditor template={template} setTemplate={setTemplate} />;
      case AppTab.SEND:
        return <Dispatcher guests={guests} template={template} onMarkSent={handleMarkSent} />;
      default:
        return null;
    }
  };

  const NavItem = ({ tab, icon: Icon, label }: { tab: AppTab, icon: any, label: string }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
        activeTab === tab 
          ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-100' 
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <Icon className={`w-5 h-5 ${activeTab === tab ? 'text-primary-600' : 'text-gray-400'}`} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex font-sans">
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 w-full bg-white z-20 border-b px-4 py-3 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">U</div>
            <span className="font-bold text-gray-800">UndangIn</span>
         </div>
         <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
            {mobileMenuOpen ? <X /> : <Menu />}
         </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen flex flex-col ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
           <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3">U</div>
           <span className="text-xl font-bold text-gray-800 tracking-tight">UndangIn</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem tab={AppTab.GUESTS} icon={Users} label="Data Tamu" />
          <NavItem tab={AppTab.TEMPLATE} icon={FileText} label="Template Pesan" />
          <NavItem tab={AppTab.SEND} icon={Send} label="Kirim Undangan" />
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl p-4 text-white">
            <p className="text-xs font-medium text-primary-100 uppercase mb-1">Status Acara</p>
            <div className="flex justify-between items-end">
               <div>
                  <span className="text-2xl font-bold">{guests.length}</span>
                  <span className="text-sm opacity-80 ml-1">Tamu</span>
               </div>
               <div className="text-right">
                  <span className="text-lg font-bold">{guests.filter(g => g.status === 'sent').length}</span>
                  <span className="text-xs opacity-80 ml-1">Terkirim</span>
               </div>
            </div>
            <div className="w-full bg-black/20 rounded-full h-1.5 mt-3">
              <div 
                className="bg-white rounded-full h-1.5 transition-all duration-500" 
                style={{ width: `${guests.length > 0 ? (guests.filter(g => g.status === 'sent').length / guests.length) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:h-screen lg:overflow-y-auto w-full pt-20 lg:pt-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
           <header className="mb-8">
             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {activeTab === AppTab.GUESTS && 'Manajemen Tamu'}
                {activeTab === AppTab.TEMPLATE && 'Template Undangan'}
                {activeTab === AppTab.SEND && 'Kirim Undangan'}
             </h1>
             <p className="text-gray-500 mt-2">
                {activeTab === AppTab.GUESTS && 'Kelola daftar tamu undangan dan status pengiriman.'}
                {activeTab === AppTab.TEMPLATE && 'Atur kata-kata undangan personal Anda.'}
                {activeTab === AppTab.SEND && 'Kirim pesan WhatsApp personal ke setiap tamu.'}
             </p>
           </header>
           
           {renderContent()}
        </div>
      </main>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-0 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;