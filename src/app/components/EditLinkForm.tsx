"use client";

import { useState, useEffect, useRef } from "react";
import { Link, CreateLinkDto } from "@/types/link";
import { getAuthToken } from "@/lib/firebase/auth-client";

type EditLinkFormProps = {
  link?: Link;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditLinkForm({
  link,
  onClose,
  onSuccess,
}: EditLinkFormProps) {
  const [formData, setFormData] = useState<CreateLinkDto>({
    name: "",
    url: "",
    description: "",
    tag: "",
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (link) {
      setFormData({
        name: link.name,
        url: link.url,
        description: link.description,
        tag: link.tag || "",
        order: link.order,
      });
    }
  }, [link]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = await getAuthToken();
      if (!token) throw new Error("Not authenticated");

      const method = link ? "PUT" : "POST";
      const body = link ? { ...formData, id: link.id } : formData;

      const response = await fetch("/api/links", {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to save link");
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-black/[0.08] bg-mist/50 px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/40 transition-colors duration-150 focus:border-accent/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/10";

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/20 backdrop-blur-[2px] sm:items-center animate-fade-in-overlay"
    >
      <div className="w-full max-w-md rounded-t-2xl bg-white p-6 shadow-modal sm:rounded-2xl animate-scale-in">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">
            {link ? "Edit link" : "New link"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition-colors hover:bg-ink/5 hover:text-ink"
            aria-label="Close"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              placeholder="My Project"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              required
              placeholder="https://example.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              rows={2}
              placeholder="A short description of this link"
              className={`${inputClasses} resize-none`}
            />
          </div>

          {/* Tag and Order - side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate">
                Tag
              </label>
              <input
                type="text"
                value={formData.tag}
                onChange={(e) =>
                  setFormData({ ...formData, tag: e.target.value })
                }
                placeholder="featured"
                className={inputClasses}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate">
                Order
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: parseInt(e.target.value) || 0,
                  })
                }
                className={inputClasses}
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="animate-slide-up rounded-xl bg-red-50 px-3.5 py-2.5 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 rounded-xl border border-black/[0.08] py-2.5 text-sm font-medium text-slate transition-colors duration-150 hover:bg-ink/[0.03] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-accent py-2.5 text-sm font-medium text-white transition-all duration-150 hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-flex items-center gap-1.5">
                  <svg
                    className="h-3.5 w-3.5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Saving
                </span>
              ) : link ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
