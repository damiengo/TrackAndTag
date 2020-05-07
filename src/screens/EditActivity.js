import React from 'react';

export default function EditActivityScreen({ navigation, route }) {
    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>
                <Header />
                </ScrollView>
            </SafeAreaView>
        </>
    );
};