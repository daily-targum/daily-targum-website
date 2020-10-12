import styles from './classifieds.module.scss';

function Classifieds() {
  return (
    <div className={styles.page}>
      {/* 
        // @ts-ignore */}
      <div id="Partner_API_CampusAve" partnerid="27" partnerdomain="https://dailytargum.campusave.com/"></div>
      <script type="text/javascript" src="https://dailytargum.campusave.com/includes/api.js"/>
    </div>
  )
}

export default Classifieds;