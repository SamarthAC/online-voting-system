function Button({
  type = 'button',
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) {
  const classes = variant === 'secondary' ? 'secondary-btn' : 'primary-btn'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
