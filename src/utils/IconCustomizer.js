import Icon from '@mui/material/Icon';
import SvgIcon from '@mui/material/SvgIcon';

export function CustomImgIcon (props) {
    return (
        <Icon { ...props }>
            <img src={ props.path } alt={ props.alt } />
        </Icon>
    )
}

export function CustomSvgIcon (props) {

    return (
        <SvgIcon { ...props }>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={ props.fill ? props.fill : "none" }
                viewBox={ props.viewBox ? props.viewBox : '0 0 24 24' }
                strokeWidth={ props.strokeWidth ? props.strokeWidth : 1.5 }
                stroke={ props.stroke ? props.stroke : 'currentColor' }
            >
                <path
                    strokeLinecap ={ props.strokeLinecap  ? props.strokeLinecap  : 'round' }
                    strokeLinejoin={ props.strokeLinejoin ? props.strokeLinejoin : 'round' }
                    d={ props.data }
                />
            </svg>
        </SvgIcon>
    )
}
