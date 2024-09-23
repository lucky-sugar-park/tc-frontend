import React from 'react';
import Grid from '@mui/material/Grid';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

import PlcConnectorCard from './PlcConnectorCard';
import InterfaceLineChartCard from './InterfaceLineChartCard';
import WebHookDarkCard from './WebHookDarkCard';
import ScheduleJobLightCard from './ScheduleJobLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import PopularCard from './PopularCard';

const gridSpacing = 3;

const DashboardContainer = (props) => {

    const [isLoading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    }, []);

    return(
        // <div>
        //     대시보드 <br/>
        //     - 등록수량 (PLC Connector, 웹훅, 인터페이스, 스케줄 잡)<br/>
        //     - 요청성공횟수, 요청실패횟수 - 전체 /  PLC 별
        //     - 연계 대상 시스템 현황<br/>
        //     - 각 구성요소별 상태 (커넥터/인터페이스/스케쥴, Running 몇 개 / Stop 몇 개)<br/>
        //     - 시간별 / 일별 / 월별 메시지 개수 (커넥터 별/ 인터페이스 별)<br/>
        // </div>

        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <PlcConnectorCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <InterfaceLineChartCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <WebHookDarkCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <ScheduleJobLightCard
                                    {...{
                                        isLoading: isLoading,
                                        total: 203,
                                        label: 'Total Income',
                                        icon: <StorefrontTwoToneIcon fontSize="inherit" />
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default DashboardContainer;