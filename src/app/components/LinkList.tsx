"use client";

import { useState } from "react";
import { Link } from "@/types/link";
import { useAuth } from "@/lib/context/AuthContext";
import LinkCard from "./LinkCard";
import EditLinkForm from "./EditLinkForm";
import { getAuthToken } from "@/lib/firebase/auth-client";

type LinkListProps = {
  initialLinks: Link[];
};

export default function LinkList({ initialLinks }: LinkListProps) {
  const { isAdmin } = useAuth();
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | undefined>(undefined);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchLinks = async () => {
    try {
      const response = await fetch("/api/links");
      if (response.ok) {
        const data = await response.json();
        setLinks(data);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  const handleEdit = (link: Link) => {
    setEditingLink(link);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingLink(undefined);
    setShowForm(true);
  };

  const handleDelete = async (linkId: string) => {
    if (deleteConfirm !== linkId) {
      setDeleteConfirm(linkId);
      setTimeout(() => setDeleteConfirm(null), 3000);
      return;
    }

    try {
      const token = await getAuthToken();
      if (!token) throw new Error("Not authenticated");

      const response = await fetch(`/api/links?id=${linkId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Failed to delete link");

      await fetchLinks();
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Failed to delete link");
    }
  };

  const handleFormSuccess = () => {
    fetchLinks();
    setShowForm(false);
    setEditingLink(undefined);
  };

  return (
    <div className="space-y-4">
      {/* Admin toolbar - compact, centered */}
      {isAdmin && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              isEditMode
                ? "bg-accent text-white shadow-sm"
                : "bg-ink/5 text-slate hover:bg-ink/10"
            }`}
          >
            {isEditMode ? "Done" : "Edit"}
          </button>
          {isEditMode && (
            <button
              onClick={handleAddNew}
              className="animate-fade-in rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-white transition-all duration-200 hover:bg-accent/90"
            >
              + Add
            </button>
          )}
        </div>
      )}

      {/* Link cards */}
      <div className="flex flex-col gap-2.5">
        {links.length === 0 ? (
          <div className="flex animate-fade-in flex-col items-center gap-3 rounded-2xl border border-dashed border-black/10 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/5">
              <svg
                className="h-5 w-5 text-slate"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.968-3.21a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-ink">No links yet</p>
              <p className="mt-1 text-xs text-slate">
                {isAdmin && isEditMode
                  ? 'Tap "+ Add" above to create your first link.'
                  : "Check back soon for new content."}
              </p>
            </div>
          </div>
        ) : (
          links.map((link, index) => (
            <LinkCard
              key={link.id}
              link={link}
              isEditMode={isEditMode && isAdmin}
              onEdit={() => handleEdit(link)}
              onDelete={() => handleDelete(link.id)}
              index={index}
            />
          ))
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <EditLinkForm
          link={editingLink}
          onClose={() => {
            setShowForm(false);
            setEditingLink(undefined);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
