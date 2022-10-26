import style from './SettingsBox.module.scss';

const SettingsBox = ({title, children}) => {
    return (
        <section className={style.Settings__Section}>
            <div className={style.Settings__Section__header}>
                <div className={style.Settings__Section__header__title}>
                    {title}
                </div>
            </div>
            <div className={style.Settings__Section__body}>
                {children}
            </div>
        </section>
    )
}

export default SettingsBox;