import React, { useState } from 'react';
import KbArticleList from '../components/KbArticleList';
import { Plus } from 'lucide-react';

const initialArticles = [
  { id: 1, title: 'How to setup payment gateways (Stripe & Razorpay)', category: 'Integrations', views: 450, status: 'Published' },
  { id: 2, title: 'Troubleshooting barcode printer offsets', category: 'Hardware support', views: 820, status: 'Published' },
  { id: 3, title: 'Exporting transaction lists to CSV & Excel', category: 'Reporting', views: 230, status: 'Published' },
  { id: 4, title: 'Customizing merchant receipt layouts', category: 'General Settings', views: 0, status: 'Draft' }
];

export default function SupportKnowledgeBase() {
  const [articles, setArticles] = useState(initialArticles);

  const handleEdit = (article) => {
    const nextTitle = prompt('Edit article title:', article.title);
    if (nextTitle) {
      setArticles(articles.map(a => a.id === article.id ? { ...a, title: nextTitle } : a));
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleCreate = () => {
    const title = prompt('Enter new article title:');
    const category = prompt('Enter category:');
    if (title) {
      setArticles([...articles, {
        id: Date.now(),
        title,
        category: category || 'General Support',
        views: 0,
        status: 'Draft'
      }]);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1f2937' }}>Platform Knowledge Base</h2>
          <p style={{ margin: '4px 0 0', fontSize: '12.5px', color: '#6b7280' }}>Write articles, upload screenshots, and publish self-service guides for merchant clients.</p>
        </div>

        <button 
          onClick={handleCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#7c3aed', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
        >
          <Plus size={16} /> New Article
        </button>
      </div>

      <KbArticleList articles={articles} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
