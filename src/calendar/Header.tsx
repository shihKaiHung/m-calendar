import * as React from 'react';

export default class Header extends React.PureComponent<{
    title?: string;
    locale?: Models.Locale;
    showClear?: boolean;
    onCancel?: () => void;
    onClear?: () => void;
}, {}> {
    fps: HTMLDivElement;

    setFPS = (dom: HTMLDivElement) => {
        if (!this.fps) {
            this.fps = dom;
            let time = +new Date;
            let count = 0;
            const raf = () => requestAnimationFrame(() => {
                const now = +new Date;
                if (now - time > 1 * 1000) {
                    dom.innerText = `JS FPS: ${count}`;
                    count = 0;
                    time = now;
                    console.log(dom.innerText);
                } else {
                    count++;
                }
                raf();
            });
            raf();
        }
    }

    render() {
        const {
            title,
            locale = {} as Models.Locale,
            onCancel,
            onClear,
            showClear
        } = this.props;

        return (
            <div className="header">
                <span className="left" onClick={() => onCancel && onCancel()}>X</span>
                <span className="title">{title || locale.title}</span>
                {
                    showClear &&
                    <span className="right"
                        onClick={() => onClear && onClear()}
                    >清除</span>
                }
            </div>
        );
    }
}