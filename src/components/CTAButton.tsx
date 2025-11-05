import styles from './CTAButton.module.css'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'a' | 'button'
  href?: string
}

export default function CTAButton({ as = 'button', href, children, ...rest }: Props) {
  if (as === 'a' && href) {
    return (
      <a href={href} className={styles.primaryButton} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={styles.primaryButton} {...rest}>
      {children}
    </button>
  )
}







