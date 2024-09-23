import * as React from 'react';
import { Box, LinearProgress, Paper, Popper } from '@mui/material';
import { unstable_debounce as debounce } from '@mui/utils';
import { DataGridPro, GridLogicOperator, GridToolbar, useGridApiRef } from '@mui/x-data-grid-pro';

// import DataGridToolbar from '../../widgets/datagrid/DataGridToolbar';
import DataGridFilterPanel from '../../widgets/datagrid/DataGridFilterPanel';
import { makeColumnDefinitions } from './ColumnDefinitions';
import { searchAuditMessage } from './AuditMessageApi';

const condMap = new Map();
condMap.set("=", "EQUALS");
condMap.set("equals", "EQUALS");
condMap.set("!=", "NOT_EQUALS");
condMap.set(">", "GREATER");
condMap.set(">=", "GREATER_THAN");
condMap.set("<", "LESS");
condMap.set("<=", "LESS_THEN");
condMap.set("between", "BETWEEN");
condMap.set("not", "NOT");
condMap.set("in", "IN");
condMap.set("notIn", "NOT_IN");
condMap.set("startsWith", "START_WITH");
condMap.set("endsWith", "END_WITH");
condMap.set("contains", "CONTAINS");

const InterfsMessageAuditDataGrid = (props) => {

  const [popperOpen, setPopperOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [detailValue, setDetailValue] = React.useState("");
  const handlePopperClick = (event, detailValue) => {
      setAnchorEl(anchorEl?null:event.currentTarget);
      setPopperOpen(!popperOpen);
      setDetailValue(detailValue);
  };

  //=====================================================================
  const apiRef = useGridApiRef();
  const [initRowsCount, setInitRowsCount] = React.useState(50);
  const [initialRows, setInitialRows] = React.useState([]);
  const [totalRowsCount, setTotalRowsCount] = React.useState(0);

  // React.useEffect(()=>{
  //   setInterfsName(props.interfsName);
  //   fetchInitialRows(props.interfsName);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // },[props.interfsName]);

  // 클라이언트 모드일 경우 해당됨
  // const [paginationModel, setPaginationModel] = React.useState({
  //   page: 1,
  //   pageSize: 25,
  // });
  const [filterModel, setFilterModel] = React.useState({ items: [] });
  const [sortModel, setSortModel] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(()=>{
    setInitRowsCount(props.initialRowsCount);
  }, [props.initialRowsCount])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchRows = React.useCallback (
    async (searchCondition) => {
      if(searchCondition.rangeInfo.limit===undefined || searchCondition.rangeInfo.limit===0) {
        searchCondition.rangeInfo.limit=50;
      }
      setLoading(true);
      const serverRows=await searchAuditMessage(searchCondition);
      setLoading(false);
      return {
        slice: serverRows.rows === undefined ? [] : serverRows.rows,
        total: serverRows.totalRowsCount,
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchInitialRows = (ifName) => {
    ( async () => {
      const conditions=[];
      if(ifName!==undefined) {
        conditions.push({
          name: "name",
          condType: "EQUALS",
          conjType: "NONE",
          value: ifName
        })
      }

      const { slice, total } = await fetchRows({
        conditions: conditions,
        rangeInfo: {
          start: 0,
          limit: initRowsCount,
          sortDirection: "ASCENDING",
          sortBy: [ "id", "name" ]
        }
      });
      if(slice===undefined) return;

      setInitialRows(slice);
      setTotalRowsCount(total);
    })();
  }

  // The initial fetch request of the viewport.
  React.useEffect(() => {
    var name=props.interfsName;

    filterModel.items.forEach(item=>{
      apiRef.current.deleteFilterItem(item);
    });

    apiRef.current.upsertFilterItem({
      field: "name",
      operator: name===undefined || ""===name?"contains":"equals",
      value: name===undefined?"":name
    })
    fetchInitialRows(name);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.interfsName]);

  // Fetch rows as they become visible in the viewport
  const handleFetchRows = React.useCallback (
    async (params, event, details) => {
      if(apiRef === null || apiRef.current === null || (apiRef.current.canSearch !== undefined && apiRef.current.canSearch===false && params.filterModel.quickFilterValues === undefined)) {
        return;
      }
      var searchCondition = params;
      if(event!==undefined) {
        searchCondition=convertToSearchCondition(params);
      }
      const { slice, total } = await fetchRows(searchCondition);
      if(params.sortModel===undefined || params.sortModel.length>0 || slice.length===0) {
        setInitialRows(slice);
      } else {  
        apiRef.current.unstable_replaceRows(params.firstRowToRender, slice);
      }
      setTotalRowsCount(total);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const debouncedHandleFetchRows = React.useMemo (
    () => {
      // parameters: (function, wait_time-시간이 길수록 타이핑에 둔감함)
      return debounce(handleFetchRows, 500); 
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const convertToSearchCondition = (params) => {
    //"params":{"sortModel":[{"field":"sender","sort":"asc"}],"filterModel":{"items":[{"field":"name","operator":"contains","id":62143,"value":"dddd","fromInput":":r50r:"},{"field":"messageId","operator":"contains","id":59567,"value":"bbbbb","fromInput":":r5c9:"}],"logicOperator":"and","quickFilterValues":[],"quickFilterLogicOperator":"and"}},"event":{"defaultMuiPrevented":false},"details":{}}
    const sortDir=params.sortModel.length<=0?"ASCENDING":params.sortModel[0].sort==="asc"?"ASCENDING":"DESCENDING";
    const sortBy=[];
    if(params.sortModel.length<=0) {
      sortBy.push("id"); sortBy.push("name");
    } else {
      params.sortModel.forEach(smodel=>{
        sortBy.push(smodel.field);
      });
    }

    const condition=[];
    if(params.filterModel.quickFilterValues) {
      const quickColumns = [ 'transactionId', 'messageId', 'name', 'messageType', 'sender', 'receiver', 'jsonString', 'description' ];
      quickColumns.forEach(column=>{
        params.filterModel.quickFilterValues.forEach(keyword=>{
          condition.push({
            name: column,
            condType: "CONTAINS",
            conjType: "OR",
            value: keyword
          });
        })
      })
    } else {
      params.filterModel.items.forEach(filter=>{
        condition.push({
          name: filter.field,
          condType: condMap.get(filter.operator),
          conjType: (params.filterModel.logicOperator===undefined || params.filterModel.logicOperator==="and") ? "AND" : "OR",
          value: filter.value
        })
      });  
    }
  
    return {
      conditions: condition,
      rangeInfo: {
        start: params.firstRowToRender,
        limit: params.lastRowToRender,
        sortDirection: sortDir,
        sortBy: sortBy
      }
    }
  }

  const handleActionButtonClicked = (actionName) => {
    if(actionName!=="APPLY") {
      apiRef.current.canSearch=false;
      return;
    }

    apiRef.current.canSearch=true;
    const searchCondition = convertToSearchCondition(
      {
        firstRowToRender: 0,
        lastRowToRender: initRowsCount,
        sortModel: sortModel,
        filterModel: filterModel
      }
    );
    handleFetchRows(searchCondition);
    apiRef.current.canSearch=false;
  }

  // const handleRowCountChange = (count) => {
  //   console.log("row count changed: " + count);
  // }

  const handleClipboardCopy = (data) => {
    console.log("COPYED=>" + data);
  }

  const handleFilterModelChange = React.useCallback (
    (filterModel) => {
      setFilterModel(filterModel);
    },[]
  )

  const debouncedHandleFilterModelChange = React.useMemo (
    () => {
      return debounce(handleFilterModelChange, 1000); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []
  );

  // const handleRowsScrollEnd = React.useCallback(
    // (params, event, details) => {
    // console.log("SCROLL END=>" + JSON.stringify(params));
    // setInitialRows([...initialRows, { id: "ispark" }])
  // })

  // 클라이언트 모드일 경우 해당됨
  // const handlePaginationModelChange = (model, details) => {
    // setPaginationModel({ page:model.page, pageSize:model.pageSize })
    // 클라이언트 모드일 경우-이부분에서 서버 Fetch를 하면 됨
    // setRows([...rows]);
  // }

  const dataGridFilterPanel = (props) => {
    return (
      <DataGridFilterPanel 
        { ...props } 
        onActionButtonClicked={ handleActionButtonClicked } 
      />
    )
  }

  return (
    <div style={{ height: props.height, width: '100%' }}>
      <DataGridPro
        rows={ initialRows }
        // {...data}
        columns={ makeColumnDefinitions({ handleClick: handlePopperClick }) }
        loading={ loading }
        apiRef={ apiRef }
        // checkboxSelection
        // client 모드일 경우에 해당
        hideFooterPagination
        // pagination
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLogicOperator.Or,
            }
          }
        }}
        slots={{ 
          //toolbar: DataGridToolbar,
          toolbar: GridToolbar,
          loadingOverlay: LinearProgress, 
          filterPanel: dataGridFilterPanel
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true
          },
          filterPanel: {
            // disableAddFilterButton: true,
            // disableRemoveAllButton: true,
            // disableMultipleColumnsFiltering: true,
            logicOperators: [GridLogicOperator.And, GridLogicOperator.Or]
          },
          
        }}
        rowCount={ totalRowsCount }
        sortingMode="server"
        filterMode="server"
        rowsLoadingMode="server"
        // 서버 모드일 경우에 해당
        onFetchRows={ debouncedHandleFetchRows }
        // client 모드일 경우에 해당
        //onPaginationModelChange={ handlePaginationModelChange }
        onSortModelChange={ setSortModel }
        onFilterModelChange={ debouncedHandleFilterModelChange }
        // onRowCountChange={ handleRowCountChange }
        // autoPageSize
        onClipboardCopy={ handleClipboardCopy }
        // onRowsScrollEnd={ handleRowsScrollEnd }
        // client 모드일 경우에 해당
        //onPaginationMetaChange={ (paginationMeta)=>console.log(paginationMeta)}
        scrollEndThreshold={ 200 }
        // client 모드일 경우에 해당
        // paginationModel={ paginationModel }
        // client 모드일 경우에 해당
        // pageSizeOptions={ [10, 25, 50, 100, 200] }
        // client 모드일 경우에 해당
        //paginationMeta={{
        //  hasNextPage: true
        //}}
        // disableColumnSorting
        // disableColumnFilter
        // disableColumnMenu
        sx={{ pt: 2, mt: 0.5 }}
      />
      <Popper open={ popperOpen } placement="auto" anchorEl={ anchorEl } disablePortal sx={{ width: "450px", height: "500px" }}>
        <Box component={ Paper } sx={{ border: 1, p: 1, alignItems: "center", mt: 1 }}>
          <pre><code>{ JSON.stringify(detailValue, null, 2) }</code></pre>
        </Box>
      </Popper>
    </div>
  );
}

export default InterfsMessageAuditDataGrid;