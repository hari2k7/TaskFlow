"use client";

import { useState } from "react";

interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    updatedAt: string;
}

const initialNotes: Note[] = [
    {
        id: "note-1",
        title: "Go & PostgreSQL Architecture",
        content: "Plan for the backend phase: \n- Use Gin or standard library net/http \n- PostgreSQL database schema with migration scripts \n- JWT token authentication \n- REST endpoints for Tasks, Goals, Habits, and Notes.",
        category: "Backend",
        updatedAt: "Sep 3, 2026",
    },
    {
        id: "note-2",
        title: "Frontend UI Guidelines",
        content: "Maintain a dark mode aesthetic with consistent slate/gray backgrounds. Use Geist fonts, subtle borders, and smooth transitions for cards and buttons. Keep local React state straightforward.",
        category: "Frontend",
        updatedAt: "Sep 2, 2026",
    },
    {
        id: "note-3",
        title: "Sprint Review Checklist",
        content: "1. Check responsiveness on mobile and tablet.\n2. Verify all routes compile without TypeScript errors.\n3. Keep Light Mode button placeholder intact.\n4. Prepare backend schema design.",
        category: "Planning",
        updatedAt: "Sep 1, 2026",
    },
];

const categories = ["All", "Backend", "Frontend", "Planning", "General"];

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [selectedNoteId, setSelectedNoteId] = useState<string>(initialNotes[0].id);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Form editing state
    const selectedNote = notes.find((n) => n.id === selectedNoteId) || notes[0];
    const [editTitle, setEditTitle] = useState<string>(selectedNote ? selectedNote.title : "");
    const [editContent, setEditContent] = useState<string>(selectedNote ? selectedNote.content : "");
    const [editCategory, setEditCategory] = useState<string>(selectedNote ? selectedNote.category : "General");

    // Select a note to view/edit
    function handleSelectNote(note: Note) {
        setSelectedNoteId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
        setEditCategory(note.category);
    }

    // Save changes to current note
    function handleSaveNote() {
        if (!selectedNote) return;

        setNotes((prev) =>
            prev.map((n) =>
                n.id === selectedNoteId
                    ? {
                          ...n,
                          title: editTitle.trim() || "Untitled Note",
                          content: editContent,
                          category: editCategory,
                          updatedAt: "Just now",
                      }
                    : n
            )
        );
    }

    // Create a new empty note
    function handleCreateNewNote() {
        const newNote: Note = {
            id: `note-${Date.now()}`,
            title: "New Note",
            content: "",
            category: "General",
            updatedAt: "Just now",
        };

        setNotes((prev) => [newNote, ...prev]);
        setSelectedNoteId(newNote.id);
        setEditTitle(newNote.title);
        setEditContent("");
        setEditCategory("General");
    }

    // Delete a note
    function handleDeleteNote(id: string, e: React.MouseEvent) {
        e.stopPropagation();
        const remaining = notes.filter((n) => n.id !== id);
        setNotes(remaining);
        if (selectedNoteId === id && remaining.length > 0) {
            handleSelectNote(remaining[0]);
        }
    }

    const filteredNotes = notes.filter((n) => {
        const matchesCategory = selectedCategory === "All" || n.category === selectedCategory;
        const matchesSearch =
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.content.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Notes
                    </h1>
                    <p className="mt-1 text-gray-400">
                        Capture quick thoughts, sprint notes, and architectural ideas.
                    </p>
                </div>

                <button
                    onClick={handleCreateNewNote}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-500"
                >
                    + New Note
                </button>
            </div>

            {/* Main Layout: Notes List + Note Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
                {/* Left: Notes List (5 cols) */}
                <div className="lg:col-span-5 rounded-xl border border-gray-800 bg-gray-900 p-4 shadow-sm flex flex-col">
                    {/* Search & Categories */}
                    <div className="space-y-3 pb-3 border-b border-gray-800">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search notes..."
                            className="w-full rounded-lg border border-gray-700 bg-gray-950/70 px-3.5 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500"
                        />

                        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`rounded-md px-2.5 py-1 font-medium transition whitespace-nowrap ${
                                        selectedCategory === cat
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-800 text-gray-400 hover:text-white"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes Scrollable list */}
                    <div className="mt-3 flex-1 space-y-2 overflow-y-auto max-h-[500px]">
                        {filteredNotes.length === 0 ? (
                            <div className="py-12 text-center text-gray-500">
                                <p className="text-sm">No notes found.</p>
                            </div>
                        ) : (
                            filteredNotes.map((note) => {
                                const isSelected = note.id === selectedNoteId;
                                return (
                                    <div
                                        key={note.id}
                                        onClick={() => handleSelectNote(note)}
                                        className={`cursor-pointer rounded-lg p-3.5 transition border text-left ${
                                            isSelected
                                                ? "border-blue-500/80 bg-blue-950/30"
                                                : "border-gray-800/80 bg-gray-950/40 hover:bg-gray-800/40 hover:border-gray-700"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-semibold text-white text-sm truncate">
                                                {note.title}
                                            </h3>
                                            <button
                                                onClick={(e) => handleDeleteNote(note.id, e)}
                                                className="text-gray-500 hover:text-red-400 p-0.5 text-xs transition"
                                                title="Delete note"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <p className="mt-1 text-xs text-gray-400 line-clamp-2 leading-relaxed">
                                            {note.content || "Empty note"}
                                        </p>

                                        <div className="mt-3 flex items-center justify-between text-[11px] text-gray-500">
                                            <span className="rounded bg-gray-800 px-1.5 py-0.5 text-gray-300 font-medium">
                                                {note.category}
                                            </span>
                                            <span>{note.updatedAt}</span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Right: Note Editor (7 cols) */}
                <div className="lg:col-span-7 rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-sm flex flex-col">
                    {selectedNote ? (
                        <>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-800">
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Note Title"
                                    className="flex-1 bg-transparent text-xl font-bold text-white outline-none placeholder-gray-500"
                                />

                                <div className="flex items-center gap-2">
                                    <select
                                        value={editCategory}
                                        onChange={(e) => setEditCategory(e.target.value)}
                                        className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-gray-200 outline-none focus:border-blue-500"
                                    >
                                        <option value="Backend">Backend</option>
                                        <option value="Frontend">Frontend</option>
                                        <option value="Planning">Planning</option>
                                        <option value="General">General</option>
                                    </select>

                                    <button
                                        onClick={handleSaveNote}
                                        className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition shadow-sm"
                                    >
                                        Save Note
                                    </button>
                                </div>
                            </div>

                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                placeholder="Start typing your note content..."
                                rows={16}
                                className="mt-4 flex-1 w-full resize-none bg-transparent text-sm leading-relaxed text-gray-200 placeholder-gray-500 outline-none"
                            />
                        </>
                    ) : (
                        <div className="flex h-full items-center justify-center text-gray-500">
                            <p className="text-sm">Select or create a note to view and edit.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
