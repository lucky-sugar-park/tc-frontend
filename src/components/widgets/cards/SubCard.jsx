import React from 'react';

import PropTypes from 'prop-types';

import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography
} from '@mui/material';

const SubCard = React.forwardRef(
    ( { 
        children, 
        content, 
        contentClass, 
        darkTitle, 
        secondary, 
        sx = {}, 
        contentSX={}, 
        title, 
        ...others
    }, ref ) => {
        const defaultShadow = '0 2px 14px 0 rgb(32 40 45 / 8%)';
        return (
            <Card
                ref={ref} 
                sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider', 
                    ':hover': { boxShadow: defaultShadow }, 
                    ...sx 
                }} 
                { ...others }
            >
                {/* card header and action */}
                { !darkTitle && title && 
                <CardHeader sx={{ p: 2.5 }} title={ <Typography variant="h5">{title}</Typography> } action={secondary} />
                }
                { darkTitle && title && 
                <CardHeader sx={{ p: 2.5 }} title={ <Typography variant="h4">{title}</Typography> } action={secondary} />
                }
                {/* content & header divider */}
                { title && <Divider />}
                {/* card content */}
                {content && (
                <CardContent sx={{ p: 2.5, ...contentSX }} className={ contentClass || '' }>
                    { children }
                </CardContent>
                )}
                { !content && children }
            </Card>
        );
    }
);

SubCard.propTypes = {
    children: PropTypes.node,
    content: PropTypes.bool,
    contentClass: PropTypes.string,
    darkTitle: PropTypes.bool,
    secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
    sx: PropTypes.object,
    contentSX: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
};

SubCard.defaultProps = {
    content: true
}

export default SubCard;