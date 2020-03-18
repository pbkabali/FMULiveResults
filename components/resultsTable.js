import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";

import {
  Table,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

import { HEADER_COLOR, POSITION_COLOR } from "../constants";

const ResultsTable = props => {
  const {
    leftPane,
    hieghtArray,
    tableData,
    positionArray,
    totalTimeArray
  } = props;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.tableView}>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            {positionArray.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={hieghtArray.slice(0, 1)}
                heightArr={hieghtArray}
                textStyle={[
                  styles.text,
                  styles.headerTextStyle,
                  index > 0 && { fontSize: 15, color: POSITION_COLOR }
                ]}
                style={[
                  styles.leftPane,
                  index == 0 && { backgroundColor: HEADER_COLOR }
                ]}
              />
            ))}
          </Table>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            {leftPane.map((rowData, index) => (
              <Row
                key={index}
                data={rowData}
                widthArr={hieghtArray.slice(1, 5)}
                heightArr={hieghtArray}
                textStyle={[styles.text, index == 0 && styles.headerTextStyle]}
                style={[
                  styles.leftPane,
                  index == 0 && { backgroundColor: HEADER_COLOR }
                ]}
              />
            ))}
          </Table>
          <ScrollView horizontal={true} style={styles.dataWrapper}>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: "#C1C0B9"
              }}
            >
              {totalTimeArray.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={hieghtArray.slice(7, 8)}
                  heightArr={hieghtArray}
                  style={[
                    styles.col,
                    index % 2 && { backgroundColor: "#F7F6E7" },
                    index == 0 && { backgroundColor: HEADER_COLOR }
                  ]}
                  textStyle={[
                    styles.text,
                    styles.headerTextStyle,
                    index > 0 && { fontSize: 12, color: POSITION_COLOR }
                  ]}
                />
              ))}
            </Table>
            <Table
              borderStyle={{
                borderWidth: 1,
                borderColor: "#C1C0B9"
              }}
            >
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={hieghtArray.slice(8, hieghtArray.length + 1)}
                  heightArr={hieghtArray}
                  style={[
                    styles.col,
                    index % 2 && { backgroundColor: "#F7F6E7" },
                    index == 0 && { backgroundColor: HEADER_COLOR }
                  ]}
                  textStyle={[
                    styles.text,
                    index == 0 && styles.headerTextStyle
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
  container: { flex: 1, padding: 5, paddingTop: 30, backgroundColor: "#fff" },
  leftPane: { height: 40, width: "auto", backgroundColor: "#537791" },
  text: { textAlign: "center", fontSize: 10 },
  dataWrapper: { marginTop: -1 },
  col: { height: 40, backgroundColor: "#E7E6E1" },
  tableView: { flexDirection: "row" },
  headerTextStyle: {
    fontWeight: "bold"
  }
});

export default ResultsTable;
