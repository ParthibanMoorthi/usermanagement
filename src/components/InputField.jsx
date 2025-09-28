export default function InputField({ type, name, value, onChange, placeholder, icon }) {
  return (
    <div className="mb-4 relative">
      {icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
          {icon}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full border border-gray-300 rounded p-2 pl-8 focus:outline-none focus:ring-1 focus:ring-black`}
      />
    </div>
  );
}
