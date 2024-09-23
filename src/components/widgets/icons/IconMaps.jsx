import { 
    Analytics as AnalyticsIcon,
    Approval as ApprovalIcon,
    Article as ArticleIcon,
    Assignment as AssignmentIcon,
    Bookmark as BookmarkIcon,
    Cable as CableIcon,
    Dashboard as DashboardIcon,
    DataObject as DataObjectIcon,
    Dataset as DatasetIcon,
    Draw as DrawIcon,
    Error as ErrorIcon,
    FactCheck as FactCheckIcon,
    Functions as FunctionsIcon,
    HelpCenter as HelpCenterIcon,
    History as HistoryIcon,
    Home as HomeIcon,
    Inbox as InboxIcon,
    Info as InfoIcon,
    InsertChart as InsertChartIcon,
    Layers as LayersIcon,
    ListAlt as ListAltIcon,
    List as ListIcon,
    ManageHistory as ManageHistoryIcon,
    ManageAccounts as ManageAccountsIcon,
    MenuBook as MenuBookIcon,
    Memory as MemoryIcon,
    MultilineChart as MultilineChartIcon,
    MyLocation as MyLocationIcon,
    People as PeopleIcon,
    PersonAddAlt1 as PersonAddAlt1Icon,
    PersonSearch as PersonSearchIcon,
    PrecisionManufacturing as PrecisionManufacturingIcon,
    PostAdd as PostAddIcon,
    QuestionAnswer as QuestionAnswerIcon,
    Settings as SettingsIcon,
    SettingsAccessibility as SettingsAccessibilityIcon,
    SettingsApplications as SettingsApplicationsIcon,
    SettingsInputComposite as SettingsInputCompositeIcon,
    Speed as SpeedIcon,
    TableView as TableViewIcon,
    TextSnippet as TextSnippetIcon,
    Tune as TuneIcon,
    ViewList as ViewListIcon,
    Webhook as WebhookIcon,
    Window as WindowIcon,
    WorkHistory as WorkHistoryIcon
} from '@mui/icons-material';

import {
    ConveyorIcon,
    ForkLiftIcon,
    MonitorWaveformIcon
} from './CustomIcons';

const iconMaps=new Map();
const configureIconMaps = () => {
    iconMaps.set("ArticleIcon", ArticleIcon );
    iconMaps.set("AnalyticsIcon", AnalyticsIcon );
    iconMaps.set("ApprovalIcon", ApprovalIcon );
    iconMaps.set("AssignmentIcon", AssignmentIcon );
    iconMaps.set("BookmarkIcon", BookmarkIcon );
    iconMaps.set("CableIcon", CableIcon );
    iconMaps.set("ConveyorIcon", ConveyorIcon );
    iconMaps.set("DashboardIcon", DashboardIcon );
    iconMaps.set("DataObjectIcon", DataObjectIcon );
    iconMaps.set("DatasetIcon", DatasetIcon );
    iconMaps.set("DrawIcon", DrawIcon );
    iconMaps.set("FactCheckIcon", FactCheckIcon );
    iconMaps.set("ForkLiftIcon", ForkLiftIcon );
    iconMaps.set("FunctionsIcon", FunctionsIcon );
    iconMaps.set("HelpCenterIcon", HelpCenterIcon );
    iconMaps.set("HistoryIcon", HistoryIcon );
    iconMaps.set("HomeIcon", HomeIcon );
    iconMaps.set("InboxIcon", InboxIcon );
    iconMaps.set("InfoIcon", InfoIcon );
    iconMaps.set("InsertChartIcon", InsertChartIcon );
    iconMaps.set("LayersIcon", LayersIcon );
    iconMaps.set("ListAltIcon", ListAltIcon );
    iconMaps.set("ListIcon", ListIcon );
    iconMaps.set("ManageAccountsIcon", ManageAccountsIcon );
    iconMaps.set("ManageHistoryIcon", ManageHistoryIcon );
    iconMaps.set("MenuBookIcon", MenuBookIcon );
    iconMaps.set("MemoryIcon", MemoryIcon );
    iconMaps.set("MonitorWaveformIcon", MonitorWaveformIcon );
    iconMaps.set("MultilineChartIcon", MultilineChartIcon );
    iconMaps.set("MyLocationIcon", MyLocationIcon );
    iconMaps.set("PeopleIcon", PeopleIcon );
    iconMaps.set("PersonAddAlt1Icon", PersonAddAlt1Icon );
    iconMaps.set("PersonSearchIcon", PersonSearchIcon );
    iconMaps.set("PostAddIcon", PostAddIcon );
    iconMaps.set("PrecisionManufacturingIcon", PrecisionManufacturingIcon );
    iconMaps.set("QuestionAnswerIcon", QuestionAnswerIcon );
    iconMaps.set("SettingsAccessibilityIcon", SettingsAccessibilityIcon );
    iconMaps.set("SettingsApplicationsIcon", SettingsApplicationsIcon );
    iconMaps.set("SettingsIcon", SettingsIcon );
    iconMaps.set("SettingsInputCompositeIcon", SettingsInputCompositeIcon );
    iconMaps.set("SpeedIcon", SpeedIcon );
    iconMaps.set("TableViewIcon", TableViewIcon );
    iconMaps.set("TextSnippetIcon", TextSnippetIcon );
    iconMaps.set("TuneIcon", TuneIcon );
    iconMaps.set("ViewListIcon", ViewListIcon );
    iconMaps.set("WebhookIcon", WebhookIcon );
    iconMaps.set("WindowIcon", WindowIcon );
    iconMaps.set("WorkHistoryIcon", WorkHistoryIcon );
}

configureIconMaps();

const getIcon = (name) => {
    let icon=iconMaps.get(name);
    if(icon===undefined) {
        icon=ErrorIcon
    }
    return icon;
}

export default getIcon;