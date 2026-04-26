function Input({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field"
      />
    </label>
  )
}

export default Input
