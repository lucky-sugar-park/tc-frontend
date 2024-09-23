import About from './about/AboutDialog';
import Home from './Home';
import PersonalInfoSecurityPolicy from './security-policy/PerfonalInfoSecurityPolicy';
import ThemeSettings from './settings/ThemeSettings';
import PlcContainer from './plc-connector/PlcConnectorContainer';
import ScheduleJobContainer from './schedule/ScheduleJobContainer';
import ScheduleJobRetrievalView from './schedule/ScheduleJobRetrievalView';
import WebHookContainer from './webhook/WebHookContainer';
import InterfsContainer from './interfs/InterfsContainer';
import InterfsMsgAuditContainer from './audit-msg/InterfsMsgAuditContainer';
import InterfsMsgAuditMonitor from './audit-msg/InterfsMsgAuditMonitor';
import InterfsSvcTestContainer from './interfs/InterfsSvcTestContainer';
import NotFound from './NotFound';
import SettingsView from './settings/SettingsView';
import VplcContainer from './vplc/VplcContainer';
import VplcMonitor from './vplc/VplcMonitor';
import DashboardContainer from './dashboard/DashboardContainer';

const configureRoute = (props) => {
    let routeList = [];

    const about = {
        "key": "/about",
        "presenter": <About { ...props } />,
        "breadcrumb": "About",
        "layout": "layout-1"
    }

    const home = {
        "key": "/",
        "presenter": <Home { ...props } />,
        "breadcrumb": "Home",
        "layout": "layout-1"
    }

    const personSecurity = {
        "key": "/security/personInfo",
        "presenter": <PersonalInfoSecurityPolicy { ...props } />,
        "breadcrumb": "security-policy",
        "layout": "layout-1"
    }

    const themeSetting = {
        "key": "/setting/theme",
        "presenter": <ThemeSettings { ...props } />,
        "breadcrumb": "setting/theme",
        "layout": "layout-1"
    }

    const plcDefault = {
        "key": "/plc-connector",
        "presenter": <PlcContainer { ...props } />,
        "breadcrumb": "plc/list",
        "layout": "layout-1"
    }

    const plcContainer = {
        "key": "/plc-connector/list",
        "presenter": <PlcContainer { ...props } />,
        "breadcrumb": "plc/list",
        "layout": "layout-1"
    }

    const interfsContainer = {
        "key": "/interface/list",
        "presenter": <InterfsContainer { ...props } />,
        "breadcrumb": "interface/list",
        "layout": "layout-1"
    }

    const interfsDefault = {
        "key": "/interface",
        "presenter": <InterfsContainer { ...props } />,
        "breadcrumb": "interface/list",
        "layout": "layout-1"
    }

    const interfsTestContainer = {
        "key": "/interface/test",
        "presenter": <InterfsSvcTestContainer { ...props } />,
        "breadcrumb": "interface/test",
        "layout": "layout-1"
    }

    const scheduleJobContainer = {
        "key": "/scheduleJob/list",
        "presenter": <ScheduleJobContainer { ...props } />,
        "breadcrumb": "scheduleJob/list",
        "layout": "layout-1"
    }

    const scheduleJobDefault = {
        "key": "/scheduleJob",
        "presenter": <ScheduleJobContainer { ...props } />,
        "breadcrumb": "scheduleJob/list",
        "layout": "layout-1"
    }

    const scheduleJobRetrivalViewr = {
        "key": "/scheduleJob/find",
        "presenter": <ScheduleJobRetrievalView { ...props } />,
        "breadcrumb": "scheduleJob/find",
        "layout": "layout-1"
    }

    const webhookContainer = {
        "key": "/webhook/list",
        "presenter": <WebHookContainer { ...props } />,
        "breadcrumb": "webhook/list",
        "layout": "layout-1"
    }

    const webhookDefault = {
        "key": "/webhook",
        "presenter": <WebHookContainer { ...props } />,
        "breadcrumb": "webhook/list",
        "layout": "layout-1"
    }

    const auditMsgHistContainer = {
        "key": "/audit-message/list",
        "presenter": <InterfsMsgAuditContainer { ...props } />,
        "breadcrumb": "audit-message/list",
        "layout": "layout-1"
    }

    const auditMsgDefault = {
        "key": "/audit-message",
        "presenter": <InterfsMsgAuditContainer { ...props } />,
        "breadcrumb": "audit-message/list",
        "layout": "layout-1"
    }

    const auditMsgMonitor = {
        "key": "/audit-message/monitor",
        "presenter": <InterfsMsgAuditMonitor { ...props } />,
        "breadcrumb": "audit-message/monitor",
        "layout": "layout-1"
    }

    var settings = {
        "key": "/env/settings",
        "presenter": <SettingsView { ...props } />,
        "breadcrumb": "env/settings",
        "layout": "layout-1"
    };

    const vplcDefault = {
        "key": "/vplc",
        "presenter": <VplcContainer { ...props } />,
        "breadcrumb": "vplc/list",
        "layout": "layout-1"
    }

    const vplcContainer = {
        "key": "/vplc/list",
        "presenter": <VplcContainer { ...props } />,
        "breadcrumb": "vplc/list",
        "layout": "layout-1"
    }
    
    const vplcMonitor = {
        "key": "/vplc/monitor",
        "presenter": <VplcMonitor { ...props } />,
        "breadcrumb": "vplc/monitor",
        "layout": "layout-1"
    }

    const dashboardContainer = {
        "key": "/dashboard",
        "presenter": <DashboardContainer { ...props } />,
        "breadcrumb": "dashboard/default",
        "layout": "layout-1"
    }

    var notfound = {
        "key": "*",
        "presenter": <NotFound { ...props } />,
        "breadcrumb": "NotFound",
        "layout": "layout-1"
    };

    routeList.push(about);
    routeList.push(home);
    routeList.push(personSecurity);
    routeList.push(themeSetting);
    routeList.push(plcDefault);
    routeList.push(plcContainer);
    routeList.push(interfsContainer);
    routeList.push(interfsDefault);
    routeList.push(interfsTestContainer);
    routeList.push(scheduleJobDefault);
    routeList.push(scheduleJobContainer);
    routeList.push(scheduleJobRetrivalViewr);
    routeList.push(webhookDefault);
    routeList.push(webhookContainer);
    routeList.push(auditMsgHistContainer);
    routeList.push(auditMsgDefault);
    routeList.push(auditMsgMonitor);
    routeList.push(settings);

    routeList.push(vplcDefault);
    routeList.push(vplcContainer);
    routeList.push(vplcMonitor);

    routeList.push(dashboardContainer);

    routeList.push(notfound);

    return routeList;
}

export {
    configureRoute
}