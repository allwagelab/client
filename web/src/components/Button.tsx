interface ButtonProps {
  color?: 'blue' | 'red'
  label: string
  onClick?: () => void
}

const Button = ({ color = 'blue', label, ...props }: ButtonProps) => {
  let buttonColor = ''
  if (color === 'blue') {
    buttonColor = 'border-blue text-blue hover:bg-blue'
  }
  if (color === 'red') {
    buttonColor = 'border-red text-red hover:bg-red'
  }

  return (
    <button
      type="button"
      className={`rounded-lg border p-3 tracking-custom hover:text-white ${buttonColor}`}
      {...props}
    >
      {label}
    </button>
  )
}
export default Button
