import React, { useState, useEffect } from 'react';
import {
  View,
  Text, 
  Dimensions
} from 'react-native';

import {
  ContributionGraph, 
  BarChart
} from "react-native-chart-kit";

import { api } from '../services/api/LocalApi';
import database from '../services/api/Database'

export default function TagStatScreen({ navigation, route }: any) {
    const [sumByDay,  setSumByDay]  = useState<any[]>([])
    const [weekData,  setWeekData]  = useState<any[]>([])
    const [weekSum,   setWeekSum]   = useState<any[]>([])
    const [weekCount, setWeekCount] = useState<any[]>([])

    let item: String = route?.params?.item
    navigation.setOptions({ title: '#'+item })

    const weekChartData = {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          data: weekData
        }
      ]
    };

    useEffect(() => { 
      init() 
    }, [item])

    const init = async () => {
        await database.setupConnection()
        const tagSumByDay = await api.getTagSumByDay(item)
        if(tagSumByDay) {
          setSumByDay(tagSumByDay)
        }
        const tagWeekStat = await api.getTagWeekStats(item, '0 days')
        if(tagWeekStat) {
          setWeekData(tagWeekStat.data)
          setWeekSum(tagWeekStat.sum)
          setWeekCount(tagWeekStat.count)
        }
    }

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#FFFFFF",
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
      strokeWidth: 3, // optional, default 3
      barPercentage: 0.8,
      useShadowColorFromDataset: false // optional
    };

    return (
        <>
            <ContributionGraph
              values={sumByDay}
              endDate={new Date()}
              numDays={100}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />

            <Text>Number {weekCount}</Text>
            <Text>Total {weekSum}</Text>
            <BarChart
              data={weekChartData}
              width={screenWidth}
              height={220}
              withHorizontalLabels={false}
              showValuesOnTopOfBars={true}
              chartConfig={chartConfig}
            />
        </>
    );
}
