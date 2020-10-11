import Text from './Text';
import Button from './Button';
import styles from './Donate.module.scss';

function SidebarCard() {
  return (
    <div className={styles.sidebarCard}>
      <Text variant='h3'>Support Independent Student Journalism</Text>
      <Text variant='p'>Your donation helps support independent student journalists of all backgrounds research and cover issues that are important to the entire Rutgers community. All donations are tax deductible.</Text>
      <br/>
      <Button href='https://paypal.com/us/fundraiser/charity/1499274'>Donate</Button>
    </div>
  )
}

export const Donate = {
  SidebarCard
}