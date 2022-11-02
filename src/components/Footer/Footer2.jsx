import style from "./Footer.module.scss";

const Footer = () => {
    
    return (
        <div className={style.Footer}>
            <div className={style.Footer__inner}>
               <img src="/bm_logo_left.png" className={style.Footer__logo} />
               <div className={style.Footer__inner__text}>
                    <p>사내 중고거래 플랫폼 <strong>블라썸 마켓</strong></p>
                    <p>신세계I&C 2022 신입 프로젝트 C조</p>
                    <p><strong>윤혜구</strong> (조장/시스템개발팀), <strong>조성현</strong> (스타벅스운영1팀), <strong>전중훈</strong> (스타벅스운영1팀), <strong>최정윤</strong> (스타벅스개발팀), <strong>이지혁</strong> (데이터센터팀), <strong>함지용</strong> (데이터센터팀), <strong>황신지</strong> (백화점1팀)</p>

                    <div className={style.Footer__inner__inc}>
                        <img src="/inc_logo.png" alt="ssg_logo" className={style.Footer__inner__inc__logo} />
                        <span>서울특별시 중구 남대문시장10길 2, 메사빌딩 21층</span>
                        <span><strong>대표이사</strong> 형태준</span>
                        <span><strong>TEL</strong> 02-3397-1234</span>
                        <span><strong>FAX</strong> 02-3397-1099</span>
                    </div>
                    <div className={style.Footer__inner__bottom}>Copyright ⓒ 2020 SHINSEGAE I&C Inc. All Rights Reserved.</div>
               </div>
            </div>
        </div>
    )
}

export default Footer;