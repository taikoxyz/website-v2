import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useClickOutside } from 'shared/lib/hooks/use-click-outside';
import Sprite from 'shared/ui/sprite';
import css from './link-dropdown.module.scss';

interface Props {
    name: string;
    links: {
        icon: string;
        name: string;
        url: string;
        bold?: boolean;
        subtitle?: string;
    }[];
    solid?: boolean;
}

export const LinkDropdown: React.FC<Props> = ({
    name,
    links,
    solid,
}) => {
    const [active, setActive] = useState(false);
    const ref = useClickOutside(() => setActive(false));

    const onActive = () => setActive(true);
    
    const onDeactivate = () => setActive(false);

    return (
        <div 
            className={clsx(
                css.root,
                active && css.rootActive,
                solid && css.rootSolid
            )} 
            onMouseEnter={!solid ? onActive : undefined}
            onMouseLeave={!solid ? onDeactivate : undefined}
            ref={ref}
            data-link
        >
            <button 
                className={css.button}
                onClick={active ? onDeactivate : onActive}
            >
                <span>{name}</span>
                <strong />
            </button>
            
            <CSSTransition
                classNames={css}
                timeout={300}
                in={active}
                mountOnEnter
                unmountOnExit
            >
                <div className={css.dropdown}>
                    <div className={css.dropdown_wrapper}>
                        <div className={css.dropdown_list}>
                            {links.map((item) => (
                               <li 
                                    className={css.dropdown_item}
                                    key={item.url}
                                >
                                    {item.url === '/' ? <a 
                                        className={css.dropdown_no_link}
                                    >
                                        {/* <Sprite.Default icon={item.icon} /> */}
                                        <div className={css.dropdown_svg}>
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <span style={{ fontWeight: item.bold ? '600' : '' }}>
                                            {item.name}
                                        </span>
                                    </a> : <a 
                                        className={css.dropdown_link}
                                        href={item.url}
                                        target={item.url.startsWith('/') ? '_self' : "_blank"}
                                    >
                                        {/* <Sprite.Default icon={item.icon} /> */}
                                        <div className={css.dropdown_svg}>
                                            <img src={item.icon} alt="" />
                                        </div>
                                        <div style={{display: 'flex', flexDirection: 'column'}}>
                                            <span style={{ fontWeight: item.bold ? '600' : '' }}>
                                                {item.name}
                                                {item.url.startsWith('/') ? '' : <>&nbsp;&nbsp;↗</>}
                                            </span>
                                            {item.subtitle && <span style={{ fontWeight: '400', fontSize: '12px', color: '#444A55' }}>
                                                {item.subtitle}
                                            </span>}
                                        </div>
                                    </a>}
                               </li>
                            ))}
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}