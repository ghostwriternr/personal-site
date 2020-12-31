import classNames from "classnames/bind";
import Image from "next/image";

import styles from "../styles/Header.module.css";

export function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.intro}>
                <Image src="/images/me.png" alt="Picture of the author" height="81" width="81" />
                <div className={styles.title}>
                    <div>
                        <span className={styles.name}>Naresh Ramesh</span>
                    </div>
                    <span className={styles.welcome}>
                        <div className={styles.language}>Hello</div>/
                        <div className={classNames("hindi", styles.language)}>नमस्ते</div>/
                        <div className={classNames("tamil", styles.language)}>வணக்கம்</div>/
                        <div className={classNames("telugu", styles.language)}>స్వాగతం</div>
                    </span>
                </div>
            </div>
            <div className={styles.desc}>
                <span>
                    I'm a <strong>software Engineer</strong>, <strong>writer</strong>, <strong>music aficionado</strong>
                    .
                </span>
                <span>Open Source maintainer and supporter.</span>
                <span>Dreaming of a prosperous India.</span>
            </div>
        </div>
    );
}
