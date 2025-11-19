"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { notFound } from 'next/navigation';

export default function ModeratorPage() {
    if (process.env.NODE_ENV !== 'development') {
        return notFound();
    }

    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/content')
            .then(res => {
                if (!res.ok) throw new Error('Not allowed or error');
                return res.json();
            })
            .then(data => {
                setContent(data);
                setLoading(false);
            })
            .catch(err => {
                setMessage('Error loading content. This page is only available in development mode.');
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        try {
            const res = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content),
            });
            if (!res.ok) throw new Error('Failed to save');
            setMessage('Saved successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error saving content.');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (path: string[], value: any) => {
        const newContent = { ...content };
        let current = newContent;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        setContent(newContent);
    };

    if (loading) return <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">Loading...</div>;

    if (!content) return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-500">Access Denied</h1>
            <p className="text-white/60">{message}</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white p-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10 sticky top-0 bg-[#050505]/90 backdrop-blur-md py-4 z-50 border-b border-white/5">
                    <div>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Content Moderator</h1>
                        <p className="text-sm text-white/40 mt-1">Edit landing page content locally</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        {message && (
                            <span className={`text-sm font-medium ${message.includes('Error') ? 'text-red-400' : 'text-green-400'}`}>
                                {message}
                            </span>
                        )}
                        <Button onClick={handleSave} disabled={saving} className="min-w-[120px]">
                            {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </div>

                <div className="space-y-8 pb-20">
                    {Object.keys(content).map(section => (
                        <div key={section} className="border border-white/10 p-6 rounded-2xl bg-white/[0.02]">
                            <h2 className="text-xl font-bold mb-6 capitalize text-accent-primary flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                                {section}
                            </h2>
                            <RecursiveEditor
                                data={content[section]}
                                path={[section]}
                                onUpdate={updateField}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function RecursiveEditor({ data, path, onUpdate }: { data: any, path: string[], onUpdate: (path: string[], value: any) => void }) {
    if (typeof data === 'string') {
        const label = path[path.length - 1].replace(/([A-Z])/g, ' $1').trim(); // CamelCase to Title Case
        const isLongText = data.length > 60 || data.includes('\n');

        return (
            <div className="mb-5 group">
                <label className="block text-xs text-white/40 mb-2 font-medium uppercase tracking-wider group-hover:text-white/60 transition-colors">
                    {label}
                </label>
                {isLongText ? (
                    <textarea
                        value={data}
                        onChange={e => onUpdate(path, e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white/90 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none min-h-[100px] transition-all resize-y"
                    />
                ) : (
                    <input
                        type="text"
                        value={data}
                        onChange={e => onUpdate(path, e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-white/90 focus:border-accent-primary focus:ring-1 focus:ring-accent-primary outline-none transition-all"
                    />
                )}
            </div>
        );
    }

    if (Array.isArray(data)) {
        return (
            <div className="pl-4 border-l-2 border-white/5 space-y-6 my-4">
                {data.map((item, index) => (
                    <div key={index} className="relative">
                        <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-white/10 border-2 border-[#050505]" />
                        <div className="text-xs text-white/30 mb-3 font-mono">ITEM {index + 1}</div>
                        <RecursiveEditor
                            data={item}
                            path={[...path, index.toString()]}
                            onUpdate={onUpdate}
                        />
                    </div>
                ))}
            </div>
        );
    }

    if (typeof data === 'object' && data !== null) {
        return (
            <div className="pl-4 border-l-2 border-white/5 space-y-4 my-2">
                {Object.keys(data).map(key => (
                    <RecursiveEditor
                        key={key}
                        data={data[key]}
                        path={[...path, key]}
                        onUpdate={onUpdate}
                    />
                ))}
            </div>
        );
    }

    return null;
}
