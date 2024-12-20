import * as React from 'react';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from 'prop-types';
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";

import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';

import { 
    GridLogicOperator,
    useGridApiContext,
    GridPanelContent,
    GridPanelFooter,
    GridPanelWrapper,
    GridFilterForm,
    useGridRootProps,
    useGridSelector,
    gridFilterModelSelector,
    gridFilterableColumnDefinitionsSelector, 
    gridFilterableColumnLookupSelector

} from '@mui/x-data-grid-pro';

const _excluded = ["logicOperators", "columnsSort", "filterFormProps", "getColumnForNewFilter", "children", "disableAddFilterButton", "disableRemoveAllButton"];

const getGridFilter = col => ({
    field: col.field,
    operator: col.filterOperators[0].value,
    id: Math.round(Math.random() * 1e5)
});

const DataGridFilterPanel = React.forwardRef(function GridFilterPanel(props, ref) {
    const apiRef = useGridApiContext();
    const rootProps = useGridRootProps();
    const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
    const filterableColumns = useGridSelector(apiRef, gridFilterableColumnDefinitionsSelector);
    const filterableColumnsLookup = useGridSelector(apiRef, gridFilterableColumnLookupSelector);
    const lastFilterRef = React.useRef(null);
    const placeholderFilter = React.useRef(null);
    const {
        logicOperators = [GridLogicOperator.And, GridLogicOperator.Or],
        columnsSort,
        filterFormProps,
        getColumnForNewFilter,
        disableAddFilterButton = false,
        disableRemoveAllButton = false,
        onActionButtonClicked
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
    const applyFilter = (item)=> {
        onActionButtonClicked("FILTER_UPDATED");
        apiRef.current.upsertFilterItem(item);
    }
    const applyFilterLogicOperator = React.useCallback(operator => {
        apiRef.current.setFilterLogicOperator(operator);
    }, [apiRef]);

    const getDefaultFilter = React.useCallback(() => {
        let nextColumnWithOperator;
        if (getColumnForNewFilter && typeof getColumnForNewFilter === 'function') {
            // To allow override the column for default (first) filter
            const nextFieldName = getColumnForNewFilter({
                currentFilters: filterModel?.items || [],
                columns: filterableColumns
            });
            if (nextFieldName === null) {
                return null;
            }
            nextColumnWithOperator = filterableColumns.find(({
                field
                }) => field === nextFieldName
            );
        } else {
            nextColumnWithOperator = filterableColumns.find(colDef => colDef.filterOperators?.length);
        }
        if (!nextColumnWithOperator) {
        return null;
        }
        return getGridFilter(nextColumnWithOperator);
    }, [filterModel?.items, filterableColumns, getColumnForNewFilter]);

    const getNewFilter = React.useCallback(() => {
        if (getColumnForNewFilter === undefined || typeof getColumnForNewFilter !== 'function') {
            return getDefaultFilter();
        }
        const currentFilters = filterModel.items.length ? filterModel.items : [getDefaultFilter()].filter(Boolean);

        // If no items are there in filterModel, we have to pass defaultFilter
        const nextColumnFieldName = getColumnForNewFilter({
            currentFilters: currentFilters,
            columns: filterableColumns
        });
        if (nextColumnFieldName === null) {
            return null;
        }
        const nextColumnWithOperator = filterableColumns.find(({
            field
            }) => field === nextColumnFieldName
        );
        if (!nextColumnWithOperator) {
            return null;
        }
        return getGridFilter(nextColumnWithOperator);
    }, [filterModel.items, filterableColumns, getColumnForNewFilter, getDefaultFilter]);

    const items = React.useMemo(() => {
        if (filterModel.items.length) {
            return filterModel.items;
        }
        if (!placeholderFilter.current) {
            placeholderFilter.current = getDefaultFilter();
        }
        return placeholderFilter.current ? [placeholderFilter.current] : [];
    }, [filterModel.items, getDefaultFilter]);

    const hasMultipleFilters = items.length > 1;
    const {
        readOnlyFilters,
        validFilters
    } = React.useMemo(() => items.reduce((acc, item) => {
        if (filterableColumnsLookup[item.field]) {
            acc.validFilters.push(item);
        } else {
            acc.readOnlyFilters.push(item);
        }
        return acc;
    }, {
        readOnlyFilters: [],
        validFilters: []
    }), [items, filterableColumnsLookup]);

    const addNewFilter = React.useCallback(() => {
        const newFilter = getNewFilter();
        if (!newFilter) {
            return;
        }
        onActionButtonClicked("ADD_NEW_FILTER");
        apiRef.current.upsertFilterItems([...items, newFilter]);
    }, [apiRef, getNewFilter, items, onActionButtonClicked]);

    const deleteFilter = React.useCallback(item => {
        const shouldCloseFilterPanel = validFilters.length === 1;
        onActionButtonClicked("DELETE_A_FILTER");
        apiRef.current.deleteFilterItem(item);
        if (shouldCloseFilterPanel) {
            apiRef.current.hideFilterPanel();
        }
    }, [apiRef, validFilters.length,onActionButtonClicked]);

    const handleRemoveAll = React.useCallback(() => {
        onActionButtonClicked("REMOVE_ALL_FILTER");
        if (validFilters.length === 1 && validFilters[0].value === undefined) {
            apiRef.current.deleteFilterItem(validFilters[0]);
            return apiRef.current.hideFilterPanel();
        }
        apiRef.current.hideFilterPanel();
        return apiRef.current.setFilterModel(_extends({}, filterModel, {
            items: readOnlyFilters
            }), 'removeAllFilterItems'
        );
    }, [apiRef, readOnlyFilters, filterModel, validFilters,onActionButtonClicked]);

    React.useEffect(() => {
        if (logicOperators.length > 0 && filterModel.logicOperator && !logicOperators.includes(filterModel.logicOperator)) {
            applyFilterLogicOperator(logicOperators[0]);
        }
    }, [logicOperators, applyFilterLogicOperator, filterModel.logicOperator]);

    React.useEffect(() => {
        if (validFilters.length > 0) {
            lastFilterRef.current.focus();
        }
    }, [validFilters.length]);

    const handleApplyFilter = () => {
        onActionButtonClicked("APPLY");
        return apiRef.current.hideFilterPanel();
    }

    const handleCancel = () => {
        return apiRef.current.hideFilterPanel();
    }

    return _jsxs( 
        GridPanelWrapper, 
        _extends(
            {
                ref: ref
            }, 
            other, 
            {
                children: 
                [
                    _jsxs(
                        GridPanelContent, 
                        {
                            children: [
                                readOnlyFilters.map((item, index) => _jsx(GridFilterForm, _extends({
                                    item: item,
                                    applyFilterChanges: applyFilter,
                                    deleteFilter: deleteFilter,
                                    hasMultipleFilters: hasMultipleFilters,
                                    showMultiFilterOperators: index > 0,
                                    disableMultiFilterOperator: index !== 1,
                                    applyMultiFilterOperatorChanges: applyFilterLogicOperator,
                                    focusElementRef: null,
                                    readOnly: true,
                                    logicOperators: logicOperators,
                                    columnsSort: columnsSort
                                }, filterFormProps), item.id == null ? index : item.id)), 
                                validFilters.map((item, index) => _jsx(GridFilterForm, _extends({
                                    item: item,
                                    applyFilterChanges: applyFilter,
                                    deleteFilter: deleteFilter,
                                    hasMultipleFilters: hasMultipleFilters,
                                    showMultiFilterOperators: readOnlyFilters.length + index > 0,
                                    disableMultiFilterOperator: readOnlyFilters.length + index !== 1,
                                    applyMultiFilterOperatorChanges: applyFilterLogicOperator,
                                    focusElementRef: index === validFilters.length - 1 ? lastFilterRef : null,
                                    logicOperators: logicOperators,
                                    columnsSort: columnsSort
                                }, filterFormProps), item.id == null ? index + readOnlyFilters.length : item.id))
                            ]
                        }
                    ), 
                    !rootProps.disableMultipleColumnsFiltering && !(disableAddFilterButton && disableRemoveAllButton) 
                    ? 
                    _jsxs(
                        GridPanelFooter, 
                        {
                            children: [
                                !disableAddFilterButton 
                                ? 
                                _jsx(rootProps.slots.baseButton, _extends(
                                    {
                                        onClick: addNewFilter,
                                        startIcon: _jsx(rootProps.slots.filterPanelAddIcon, {})
                                    }, 
                                    rootProps.slotProps?.baseButton, 
                                    {
                                        children: apiRef.current.getLocaleText('filterPanelAddFilter')
                                    }
                                )) 
                                : 
                                _jsx("span", {}), 
                                !disableRemoveAllButton && validFilters.length > 0 
                                ? 
                                _jsx(rootProps.slots.baseButton, _extends(
                                    {
                                        onClick: handleRemoveAll,
                                        startIcon: _jsx(rootProps.slots.filterPanelRemoveAllIcon, {})
                                    }, 
                                    rootProps.slotProps?.baseButton, 
                                    {
                                        children: apiRef.current.getLocaleText('filterPanelRemoveAll')
                                    }
                                )) 
                                : 
                                _jsx("span", {}),
                                _jsx(rootProps.slots.baseButton, _extends(
                                    {
                                        onClick: handleApplyFilter,
                                        startIcon: <DoneIcon />
                                    }, 
                                    rootProps.slotProps?.baseButton, 
                                    {
                                        children: "Apply Filters"
                                    }
                                )),
                                _jsx("span", {}),
                                _jsx(rootProps.slots.baseButton, _extends(
                                    {
                                        onClick: handleCancel,
                                        startIcon: <CancelIcon />
                                    }, 
                                    rootProps.slotProps?.baseButton, 
                                    {
                                        children: "Cancel"
                                    }
                                )),
                            ]
                        }
                    ) 
                    :
                    _jsxs(
                        GridPanelFooter,
                        {
                            children: [
                                _jsx("span", {}),
                                _jsx("span", {}),
                                _jsx(rootProps.slots.baseButton, _extends(
                                    {
                                        onClick: handleApplyFilter,
                                        startIcon: <DoneIcon />
                                    }, 
                                    rootProps.slotProps?.baseButton, 
                                    {
                                        children: "Apply Filters"
                                    }
                                )),
                                _jsx("span", {}),
                                _jsx(rootProps.slots.baseButton, _extends(
                                    {
                                        onClick: handleCancel,
                                        startIcon: <CancelIcon />
                                    }, 
                                    rootProps.slotProps?.baseButton, 
                                    {
                                        children: "Cancel"
                                    }
                                )),
                            ]
                        }
                    )
                ]
            }
        )
    );
});

process.env.NODE_ENV !== "production" ? DataGridFilterPanel.propTypes = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // | To update them edit the TypeScript types and run "yarn proptypes"  |
    // ----------------------------------------------------------------------
   /**
    * @ignore - do not document.
    */
    children: PropTypes.node,
   /**
    * Changes how the options in the columns selector should be ordered.
    * If not specified, the order is derived from the `columns` prop.
    */
    columnsSort: PropTypes.oneOf(['asc', 'desc']),
   /**
    * If `true`, the `Add filter` button will not be displayed.
    * @default false
    */
    disableAddFilterButton: PropTypes.bool,
   /**
    * If `true`, the `Remove all` button will be disabled
    * @default false
    */
    disableRemoveAllButton: PropTypes.bool,
   /**
    * Props passed to each filter form.
    */
    filterFormProps: PropTypes.shape({
        columnInputProps: PropTypes.any,
        columnsSort: PropTypes.oneOf(['asc', 'desc']),
        deleteIconProps: PropTypes.any,
        filterColumns: PropTypes.func,
        logicOperatorInputProps: PropTypes.any,
        operatorInputProps: PropTypes.any,
        valueInputProps: PropTypes.any
    }),
   /**
    * Function that returns the next filter item to be picked as default filter.
    * @param {GetColumnForNewFilterArgs} args Currently configured filters and columns.
    * @returns {GridColDef['field']} The field to be used for the next filter or `null` to prevent adding a filter.
    */
    getColumnForNewFilter: PropTypes.func,
   /**
    * Sets the available logic operators.
    * @default [GridLogicOperator.And, GridLogicOperator.Or]
    */
    logicOperators: PropTypes.arrayOf(PropTypes.oneOf(['and', 'or']).isRequired),
   /**
    * The system prop that allows defining system overrides as well as additional CSS styles.
    */
    sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object])
} : void 0;

/**
 * Demos:
 * - [Filtering - overview](https://mui.com/x/react-data-grid/filtering/)
 *
 * API:
 * - [GridFilterPanel API](https://mui.com/x/api/data-grid/grid-filter-panel/)
 */
export default DataGridFilterPanel;
export { DataGridFilterPanel, getGridFilter };