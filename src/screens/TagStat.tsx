import React, { useState, useEffect } from 'react';
import {
  View,
  Text, 
  Dimensions
} from 'react-native';

import {
  ContributionGraph
} from "react-native-chart-kit";

import { api } from '../services/api/LocalApi';
import database from '../services/api/Database'

export default function TagStatScreen({ navigation, route }: any) {
    const [data, setData] = useState<any[]>([])

    const commitsData = [
      { date: "2017-01-02", count: 1 },
      { date: "2017-01-03", count: 2 },
      { date: "2017-01-04", count: 3 },
      { date: "2017-01-05", count: 4 },
      { date: "2017-01-06", count: 5 },
      { date: "2017-01-30", count: 2 },
      { date: "2017-01-31", count: 3 },
      { date: "2017-03-01", count: 2 },
      { date: "2017-04-02", count: 4 },
      { date: "2017-03-05", count: 2 },
      { date: "2017-02-30", count: 4 }
    ];

    let item: String = route?.params?.item
    navigation.setOptions({ title: '#'+item })

    useEffect(() => { 
      init() 
    }, [item])

    const init = async () => {
        await database.setupConnection()
        const tagSumByDay = await api.getTagSumByDay(item)
        if(tagSumByDay) {
          setData(tagSumByDay)
        }
    }

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
      backgroundGradientFrom: "#FFFFFF",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#FFFFFF",
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };

    return (
        <>
            <Text>Tag detail</Text>
            <ContributionGraph
              values={data}
              endDate={new Date()}
              numDays={100}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
        </>
    );
}
