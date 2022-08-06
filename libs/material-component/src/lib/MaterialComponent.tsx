import styles from './MaterialComponent.module.scss';

/* eslint-disable-next-line */
export interface MaterialComponentProps {}

export function MaterialComponent(props: MaterialComponentProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MaterialComponent!</h1>
    </div>
  );
}

export default MaterialComponent;
