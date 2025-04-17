import React from 'react';
import Link from 'next/link';
import styles from '@/styles/NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.notfoundContainer}>
      <div className={styles.notfoundContent}>
        <h1 className={styles.notfoundTitle}>404</h1>
        <p className={styles.notfoundMessage}>죄송합니다, 찾을 수 없는 페이지입니다.</p>
        <Link href="/" className={styles.notfoundHomeBtn}>홈으로 돌아가기</Link>
      </div>
    </div>
  );
}

export default NotFound;
