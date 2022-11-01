import style from "./Footer.module.scss";

const Footer = () => {
    
    return (
        <div className={style.Footer}>
            <div className={style.Footer__inner}>
               <img src="/bm_logo_left.png" className={style.Footer__logo} />
               <div className={style.Footer__inner__text}>
                    <p>사내 중고거래 플랫폼 <strong>블라썸 마켓</strong></p>
                    <p>신세계I&C 2022 신입 프로젝트 C조</p>
                    <p>윤혜구 (조장/시스템개발팀), 조성현(스타벅스운영1팀), 전중훈(스타벅스운영1팀), 최정윤(스타벅스개발팀), 이지혁(데이터센터팀), 함지용(데이터센터팀), 황신지(백화점1팀)</p>
               </div>
            </div>
        </div>
    )
}

export default Footer;