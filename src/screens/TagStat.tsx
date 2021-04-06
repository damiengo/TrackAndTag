import React, { useState, useEffect } from 'react';
import {
  View,
  Text, 
  Dimensions
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";

import {
  ContributionGraph
} from "react-native-chart-kit";

import { api } from '../services/api/LocalApi';
import database from '../services/api/Database'

export default function TagStatScreen({ navigation, route }: any) {
    const [tag, setTag] = useState<any[]>([])

    let item: String = ''
    if(route.params) {
        item = {...item, ...route.params.item}
    }

    const isFocused = useIsFocused();
    useEffect(() => { init() }, [isFocused])

    const init = async () => {
        await database.setupConnection()
        /*const loadedAct = await api.getActivitiesAndTagsLabel(' ')
        if(loadedAct) {
          setActivities(loadedAct)
        }*/
    }

    const screenWidth = Dimensions.get("window").width;
    const chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false // optional
    };
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

    return (
        <>
            <Text>Tag detail</Text>
            <ContributionGraph
              values={commitsData}
              endDate={new Date("2017-04-01")}
              numDays={105}
              width={screenWidth}
              height={220}
              chartConfig={chartConfig}
            />
        </>
    );
}
