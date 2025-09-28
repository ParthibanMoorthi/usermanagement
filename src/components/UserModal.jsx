import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function UserModal({ open, onClose, onSave, initialData = null, fields = [] }) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const isEdit = Boolean(initialData?.id);

  useEffect(() => {
    const newForm = {};
    fields.forEach(f => {
      newForm[f.name] = initialData?.[f.name] ?? initialData?.avatar ?? "";
    });
    setForm(newForm);
  }, [initialData, open, fields]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
     
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-semibold">{isEdit ? "Edit User" : "Create New User"}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.required && <span className="text-red-500 mr-1">*</span>}
                {field.label}
              </label>
             <input
                name={field.name}
                type={field.type === "email" ? "email" : "text"}
                value={form[field.name] || ""}
                onChange={handleChange}
                placeholder={field.label}
                className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 rounded text-sm w-full"
                required={field.required}
              />
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-black text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded bg-[#1990FF] text-white text-sm"
            >
              {saving ? (isEdit ? "Saving..." : "Creating...") : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
