import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import { Table, Row } from "react-native-table-component";

import TableRow from "./tableRow";
import {
  HEADER_COLOR,
  POSITION_COLOR,
  BUTTON_1_COLOR,
  TABLE_BORDER_COLOR,
  LEFT_PANE_BACKGROUND_COLOR,
  RIGH_PANE_BACKGROUND_COLOR_1,
  RIGH_PANE_BACKGROUND_COLOR_2,
} from "../constants";

const ResultsTable = (props) => {
  const {
    leftPane,
    hieghtArray,
    tableData,
    positionArray,
    totalTimeArray,
    penaltiesArray,
    diffLeaderArray,
    diffPreviousArray,
  } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tableView}>
          <Table
            borderStyle={{ borderWidth: 1, borderColor: TABLE_BORDER_COLOR }}
          >
            {positionArray.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={hieghtArray.slice(0, 1)}
                heightArr={hieghtArray}
                textStyle={[
                  styles.text,
                  styles.headerTextStyle,
                  index > 0 && { fontSize: 15, color: POSITION_COLOR },
                ]}
                style={[
                  styles.leftPane,
                  index == 0 && { backgroundColor: HEADER_COLOR },
                ]}
              />
            ))}
          </Table>
          <Table
            borderStyle={{ borderWidth: 1, borderColor: TABLE_BORDER_COLOR }}
          >
            {leftPane.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={hieghtArray.slice(1, 5)}
                heightArr={hieghtArray}
                textStyle={[
                  styles.text,
                  styles.headerTextStyle,
                  { textAlign: "left", marginLeft: 2 },
                ]}
                style={[
                  styles.leftPane,
                  index == 0 && { backgroundColor: HEADER_COLOR },
                ]}
              />
            ))}
          </Table>
          <ScrollView horizontal={true} style={styles.dataWrapper}>
            {/* Total-Time Column */}
            <TableRow
              hieghtArray={hieghtArray}
              array={totalTimeArray}
              position={7}
              backgroundColor={RIGH_PANE_BACKGROUND_COLOR_2}
              textColor={BUTTON_1_COLOR}
              fontWeight="bold"
            />
            {/* Penalties Column */}
            <TableRow
              hieghtArray={hieghtArray}
              array={penaltiesArray}
              position={8}
              backgroundColor={RIGH_PANE_BACKGROUND_COLOR_2}
              textColor={HEADER_COLOR}
              fontWeight="normal"
            />
            {/* Diff_Leader Column */}
            <TableRow
              hieghtArray={hieghtArray}
              array={diffLeaderArray}
              position={9}
              backgroundColor={RIGH_PANE_BACKGROUND_COLOR_2}
              textColor={POSITION_COLOR}
              fontWeight="normal"
            />
            {/* Diff_Previous Column */}
            <TableRow
              hieghtArray={hieghtArray}
              array={diffPreviousArray}
              position={10}
              backgroundColor={RIGH_PANE_BACKGROUND_COLOR_2}
              textColor="blue"
              fontWeight="normal"
            />
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: TABLE_BORDER_COLOR,
              }}
            >
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={hieghtArray.slice(11, hieghtArray.length + 1)}
                  heightArr={hieghtArray}
                  style={[
                    styles.col,
                    index % 2 && {
                      backgroundColor: RIGH_PANE_BACKGROUND_COLOR_2,
                    },
                    index == 0 && { backgroundColor: HEADER_COLOR },
                  ]}
                  textStyle={[
                    styles.text,
                    index == 0 && styles.headerTextStyle,
                  ]}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 1, backgroundColor: "#fff" },
  leftPane: {
    height: 40,
    width: "auto",
    backgroundColor: LEFT_PANE_BACKGROUND_COLOR,
  },
  text: { textAlign: "center", fontSize: 10 },
  dataWrapper: { marginTop: -1 },
  col: { height: 40, backgroundColor: RIGH_PANE_BACKGROUND_COLOR_1 },
  tableView: { flexDirection: "row" },
  headerTextStyle: {
    fontWeight: "bold",
  },
});

export default ResultsTable;
